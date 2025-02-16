@php
    use Carbon\Carbon;
@endphp

<!DOCTYPE html>
<html>
<head>
    <title>New Task Assigned</title>
    <style>
        body { 
          font-family: Arial, sans-serif; 
          background-color: #f4f4f4;
          padding: 0;
          margin: 0; 
          height: 100vh;
        }

        .logo{
            width: 40px;
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
        .button { 
          display: block; 
          width: 200px; 
          margin: 20px auto; 
          padding: 10px; 
          text-align: center; 
          background-color: #007bff; 
          color: white; 
          text-decoration: none; 
          border-radius: 5px; 
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
                <p>A new task has been assigned to you for the event "<strong>{{ $event->name }}</strong>." Please review the task details below:</p>
                <p><strong>Task:</strong> {{ $task->task_name }}</p>
                <p><strong>Deadline:</strong> {{ $task->deadline ? Carbon::parse($task->deadline)->format('F j, Y') : 'No deadline specified' }}</p>
                <p><strong>Event Date:</strong> {{ Carbon::parse($event->date)->format('F j, Y') }}</p>
            </div>

            <div class="footer">
                <p class="notification">
                    This email is for notification purposes only. No action is required if you have already acknowledged this task.
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
