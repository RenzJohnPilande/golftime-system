<!DOCTYPE html>
<html>
<head>
    <title>New Event Created</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .main-container {
            width: 100%;
            height: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            max-width: 80px;
        }
        .header-container{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
        .header-title {
            font-size: 35px;
            font-weight: 700;
            text-transform: uppercase;
            color: black;
            margin-bottom: 10px;
        }
        h1 {
            color: black;
        }
        p {
            color: black;
            font-size: 16px;
            line-height: 1.5;
        }
        .event-name {
            font-weight: bold;
            color: black;
        }
        .event-date {
            font-style: italic;
            color: black;
        }
        .notification {
            font-size: 14px;
            color: #555;
            margin-top: 20px;
            font-style: italic;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: black;
            text-align: left;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="container">
            <div class="header-container">
                <img src="{{ asset('images/GolfTimeLogo.png') }}" alt="Golf Time PH Logo" class="logo">
                <h1 class="header-title">Golf Time PH</h1>
            </div>

            <h1>Hello!</h1>
            <p>A new event has been created: <span class="event-name">{{ $event->name }}</span></p>
            <p class="event-date">Date: {{ $event->date }}</p>

            <p class="notification">
                This email is for notification purposes only. No action is required on your part.
            </p>

            <div class="footer">
                <p>Best regards,</p>
                <p><strong>Golf Time PH</strong></p>
            </div>
        </div>
    </div>
</body>
</html>
