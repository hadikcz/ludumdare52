export enum UnitState {
    WAITING = 'waiting',
    PICKUP = 'pickup',
    LOOKING_FOR_DELIVERY_TARGET = 'look for delivery',
    LOOKING_FOR_DELIVERY_TARGET_EXCEPT_WAREHOUSE = 'look for delivery ex warhouse',
    DELIVERY = 'delivery',
    MOVING_TO_INN = 'to inn',
    EATING = 'eating'
}
