<?php

namespace phpnl\service;

class Slack
{

    protected $team;
    protected $token;
    protected $info;

    function __construct($team, $token)
    {
        $this->team = $team;
        $this->token = $token;

        $this->refresh();
    }

    function refresh()
    {
        $url = 'https://' . $this->team . '.slack.com/api/rtm.start?token=' . $this->token;
        $info = file_get_contents($url);
        $this->info = json_decode($info, true);
    }

    function getInfo()
    {
        return $this->info;
    }

    function getImageSrc($width = 132)
    {
        if (! isset($this->info['team']['icon']['image_'.$width])) {
            return null;
        }
        return $this->info['team']['icon']['image_'.$width];
    }

    function getTeamName()
    {
        return $this->info['team']['name'];
    }

    function getUserCount()
    {
        $total = 0;
        $active = 0;

        foreach ($this->info['users'] as $user) {
            $total++;
            if ($user['presence'] == 'active') {
                $active++;
            }
        }
        return array('total' => $total, 'active' => $active);
    }

    function invite($email)
    {
        $url = 'https://slack.com/api/users.admin.invite';

        $data = array ('token' => $this->token, 'email' => $email);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $result = curl_exec($ch);

        $result = json_decode($result, true);
        return $result;
    }
}
