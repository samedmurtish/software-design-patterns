```mermaid
classDiagram
    class NotificationService {
        +send(type, payload)
    }

    class INotification {
        +send(to: string, message: string) : void
    }
    <<interface>> INotification

    class LegacySmsApi {
        +pushMessage(phone: string, text: string, isFlash: boolean) : void
    }

    class LegacySmsAdapter {
        -legacySmsApi: LegacySmsApi
        +send(to: string, message: string) : void
    }

    class NotificationDecorator {
        #wrappedNotification: INotification
        +send(to: string, message: string) : void
    }
    <<abstract>> NotificationDecorator

    class LoggingDecorator {
        +send(to: string, message: string) : void
    }

    INotification <|-- LegacySmsAdapter : Implements
    LegacySmsAdapter o-- LegacySmsApi : adapts/wraps
    INotification <|-- NotificationDecorator : Aggregates (wraps)
    NotificationDecorator <|-- LoggingDecorator : Inherits
    NotificationService --> INotification : Uses (wrapped via Decorator)
