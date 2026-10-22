# TASK: Implement Factory Method for interchangeable notification providers

## Pseudocode

### Product interface

```text
Interface NotificationProvider {
    sendMail()
}
````

### Concrete products

text
```
class  outlookProvider implements NotificationProvider{
    sendMail(“prints outlook”)
}

class  sendGridProvider implements NotificationProvider{
    sendMail(“prints sendgrid”)
}
```

### Creator class

text
```
class abstract SendNotification{
    const createProvider(): NotificationProvider
    notify(provider.sendMail)
}
```

### Concrete creators

text
```
Class OutlookNotification extends SendNotification{
    const createProvider() ={
        return new outlookProvider()
    }
}

Class SendGridNotification extends SendNotification{
    const createProvider() ={
        return new sendGridProvider()
    }
}
```

### Actual usage

text
```
Const notification = outlookNotification()
notification.notify()
```

```

 