<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

//Request::setTrustedProxies(array('127.0.0.1'));

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html', array());
})->bind('homepage');

$app->get('/slack', function () use ($app) {
    $slack = $app['slack'];

    $info = $slack->getInfo();
    $avatars = array();
    foreach ($info['users'] as $user) {
        $avatars[$user['name']] = $user['profile']['image_24'];
    }

    return $app['twig']->render('slack.html', array(
        'image' => $slack->getImageSrc(132),
        'team' => $slack->getTeamName(),
        'users' => $slack->getUserCount(),
        'avatars' => $avatars,
    ));
})->bind('slack');

$app->get('/slack_invite', function (Request $request) use ($app) {
    $slack = $app['slack'];

    if (! $request->request->has('email')) {
        return new Response("No email address", 400);
    }

    $result = $slack->invite($request->request->get('email'));

    if ($result['ok'] != "true") {
        return new Response($result['error'], 400);
    } else {
        return new Response("ok", 200);
    }

})->bind('slack_invite')->method('POST');

$app->error(function (\Exception $e, $code) use ($app) {
    if ($app['debug']) {
        return;
    }

    // 404.html, or 40x.html, or 4xx.html, or error.html
    $templates = array(
        'errors/'.$code.'.html',
        'errors/'.substr($code, 0, 2).'x.html',
        'errors/'.substr($code, 0, 1).'xx.html',
        'errors/default.html',
    );

    return new Response($app['twig']->resolveTemplate($templates)->render(array('code' => $code)), $code);
});
