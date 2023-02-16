
export const ServiceOrderStatus = {
    PLACED: 'placed',
    PAID: 'paid',
    IN_PROGRESS: 'in progress',
    READY_TO_REVIEW: 'ready-to-review',
    CHANGES_REQUESTED: 'changes-requested',
    COMPLETED: 'completed',
    CANCELED: 'canceled'
}



export const OrderStepCompleted = {
    DONE: 'DONE',
    TODO: 'TODO',
    DOING: 'DOING',
}

export const isOrderStatusDone = (status: string, currentStatus: string) => {
    console.log("Is order status done", status, currentStatus);
    if (status === currentStatus) {
        return OrderStepCompleted.DOING;
    }

    let preStates: any[] = [];

    switch (currentStatus) {
        case ServiceOrderStatus.IN_PROGRESS: preStates = [ServiceOrderStatus.PLACED]; break;
        case ServiceOrderStatus.READY_TO_REVIEW: preStates = [ServiceOrderStatus.PLACED, ServiceOrderStatus.IN_PROGRESS]; break;
        case ServiceOrderStatus.CHANGES_REQUESTED: preStates = [ServiceOrderStatus.PLACED, ServiceOrderStatus.IN_PROGRESS, ServiceOrderStatus.READY_TO_REVIEW]; break;
        case ServiceOrderStatus.COMPLETED: preStates = [ServiceOrderStatus.PLACED, ServiceOrderStatus.IN_PROGRESS, ServiceOrderStatus.READY_TO_REVIEW, ServiceOrderStatus.CHANGES_REQUESTED]; break;
    }

    return (preStates.indexOf(status) >= 0) ? OrderStepCompleted.DONE : OrderStepCompleted.TODO;
}
