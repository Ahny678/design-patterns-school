//Implement Observer for order-confirmation notifications.
//create abstract observer interface. then concrete ones to implement a change when order is confirmed.
//create a publisher. it adds, removes observers and sends the notifs.

// ABSTRACT OBSERVER
interface NotifObserver {
  update(): void;
}

// CONCRETE OBSERVER 1: Email Confirmation
class EmailObserver implements NotifObserver {
  update(): void {
    console.log("Order confirmation email sent to customer.");
  }
}

// CONCRETE OBSERVER 2: SMS Confirmation
class SMSObserver implements NotifObserver {
  update(): void {
    console.log("Order confirmation SMS sent to customer.");
  }
}

// CONCRETE OBSERVER 3: Inventory Update
class InventoryObserver implements NotifObserver {
  update(): void {
    console.log("Product stock updated after order confirmation.");
  }
}
// PUBLISHER
class NotificationPublisher {
  private observers: NotifObserver[] = [];

  // Add observer
  add(observer: NotifObserver): void {
    this.observers.push(observer);
  }

  // Remove observer
  remove(observer: NotifObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Notify all observers
  send(): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }
}

const publisher = new NotificationPublisher();

publisher.add(new EmailObserver());
publisher.add(new SMSObserver());
publisher.add(new InventoryObserver());

// Notify all observers when order is confirmed
publisher.send();
