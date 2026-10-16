# Week 1 Practical: Recognising Design Problems

Read the code in `src/`, run it, then answer the questions below in your own notes.
Don't refactor yet — analysis comes first.

## Tasks
1. **Map responsibilities.** List everything `OrderService` does.
2. **Find problems.** Identify at least five specific design problems, naming the class/method involved.
3. **Consequences.** For each problem, explain what goes wrong in practice (changing, testing, extending).
4. **SOLID.** Which principles apply? Don't assume all five are violated — justify each one you name, and say which don't really apply here.
5. **Necessary vs unnecessary.** Which changes are worth making, and which would add complexity this small app doesn't need?
6. **Cleaner design.** Sketch your improved design as a small class diagram or text diagram.
7. **Patterns.** Would any design pattern genuinely help? Justify each one — "none" is a valid answer for some parts.
8. **Tests.** What tests would you write to verify the improved design?

## Change scenarios to think through
- Add a new payment method (e.g. bank transfer).
- Send notifications by SMS instead of email.
- Test payment logic without sending emails.
- Change the free-shipping threshold.

## Concept check
In a few sentences each, explain the difference between a **design principle**, a **design pattern**, and an **architectural style**, with one example of each.
