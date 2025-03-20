@php
    use Carbon\Carbon;
@endphp

<!DOCTYPE html>
<html>
<head>
    <title>Event Reminder</title>
    <style>
        body { 
          font-family: Arial, sans-serif; 
          background-color: #f4f4f4;
          padding: 0;
          margin: 0; 
          height: 100vh;
        }

        .main-container{
            background-color: #f4f4f4;
            display: flex;
            align-items: center;
            height: 100%;
            padding: 20px;
        }
        .container { 
          max-width: 600px; 
          margin: auto; 
          background: #ffffff; 
          padding: 20px; 
          border-radius: 8px; 
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
        }

        .header{
            padding: 0 10px 0 10px;
        }
        .header-title{
          font-size: 24px;
          text-transform: uppercase;
          font-weight: 800;
        }
        .brand-logo{
          width: 50px !important;
          height: auto !important;
        }
        .content { 
          padding: 10px;  
          font-size: 16px; 
          color: #333 !important; 
        }
        .footer { 
          padding: 10px; 
          font-size: 12px; 
          color: #777; 
        }

        .logo-container{
            float: right;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="container">
            <div class="header">
                <h1 class="header-title">Golf Time PH</h1>
            </div>

            <div class="content">
                <p>Hello {{$user->firstname}},</p>
                <p>This is a friendly reminder that your event, "<strong>{{ $event->name }}</strong>", is scheduled for tomorrow.</p>
                <p>Please ensure that all necessary arrangements are in place before the event begins.</p>
                <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($event->date)->format('F j, Y') }}</p>
                <p>We hope you have a great experience!</p>
            </div>

            <div class="footer">
                <p class="notification">
                    This email is for notification purposes only. No action is required on your part.
                </p>
                <p>Best regards,</p>
                <p><strong>Golf Time PH</strong></p>
            </div>

            <div class="logo-container">
                <img src="https://lh3.googleusercontent.com/d/1DnACBzCVPHz_86RbVBfqobo8ZTugAvOj" alt="Golf Time PH Logo" class="brand-logo">
            </div>
        </div>
    </div>
</body>
</html>
