interface ListNode {
    value: unknown | null
    next: ListNode | null
    prev: ListNode | null

    change(value: unknown): void
}

interface IDoublyLinkedList {
    head: ListNode | null;
    tail: ListNode | null;
    insertStart: (value: unknown) => void
    insertEnd: (value: unknown) => void
    deleteStart: () => void
    deleteEnd: () => void
    delete: (value: unknown) => void
    find: (value: unknown) => unknown | null
    length: () => number
}

class DoublyLinkedListNode implements ListNode {
    value: unknown | null = null
    next: ListNode | null = null
    prev: ListNode | null = null

    constructor(value: unknown, prev: ListNode | null, next: ListNode | null) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }


    change(value: unknown) {
        this.value = value
    }

}

class DoublyLinkedList implements IDoublyLinkedList {
    head: ListNode | null = null;
    tail: ListNode | null = null;


    insertStart(value: unknown) {
        if (this.head === null) {
            const node = new DoublyLinkedListNode(value, null, null);
            this.head = node;
            this.tail = node;
        } else {
            const node = new DoublyLinkedListNode(value, null, this.head);
            this.head.prev = node;
            this.head = node;
        }
    }

    insertEnd(value: unknown) {
        if (this.tail === null) {
            const node = new DoublyLinkedListNode(value, null, null);
            this.head = node;
            this.tail = node;
        } else {
            const node = new DoublyLinkedListNode(value, this.tail, null);
            this.tail.next = node;
            this.tail = node;
        }
    }

    deleteStart() {
        if (!this.head) return null

        if (this.head === this.tail) {
            this.head = null
            this.tail = null
        } else {
            this.head = this.head.next as ListNode //@TODO Арам, помогли плиз избавиться от AS
            this.head.prev = null
        }
    }

    deleteEnd() {
        if (!this.tail) return null

        if (this.head === this.tail) {
            this.head = null
            this.tail = null
        } else {
            this.tail = this.tail.prev as ListNode //@TODO Арам, помогли плиз избавиться от AS
            this.tail.next = null
        }
    }

    delete(value: unknown) {
        // Если нет head значит список пуст.
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode: ListNode | null = this.head;

        // Перебираем все узлы и удаляем их, если их значение равно указанному.
        while (currentNode) {
            if (currentNode.value === value) {
                // Сохраняем значение текущего узла как удаленное.
                deletedNode = currentNode;

                // Если head должен быть удален,
                if (deletedNode === this.head) {
                    // то делаем следующий узел новым head
                    this.head = deletedNode.next;

                    // Меняем в новом head ссылку (prev) на null.
                    if (this.head) {
                        this.head.prev = null;
                    }

                    // Если все узлы в списке имеют одинаковое значение,
                    // которое передается в качестве аргумента,
                    // тогда все узлы будут удалены. Поэтому tail необходимо обновить.
                    if (deletedNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deletedNode === this.tail) {
                    // Если tail должен быть удален, -
                    // меняем tail на предпоследний узел, который станет новым хвостом.
                    this.tail = deletedNode.prev as ListNode
                    // Обновляем ссылку next в новом хвосте.
                    this.tail.next = null;
                } else {
                    // Если средний узел будет удален, -
                    // сохраняем ссылку на предыдущий элемент,
                    const prevNode = deletedNode.prev as ListNode //@TODO Арам, помогли плиз избавиться от AS
                    // и сохраняем ссылку на следующий элемент.
                    const nextNode = deletedNode.next as ListNode //@TODO Арам, помогли плиз избавиться от AS
                    // Меняем ссылки у предыдущего и следующего узлов от удаленного узла,
                    // чтобы они больше не ссылались на удаленный узел.
                    prevNode.next = nextNode;
                    nextNode.prev = prevNode;
                }
            }

            // Перематываем на один узел вперёд.
            currentNode = currentNode.next
        }

        return deletedNode;
    }

    find(value: unknown) {
        if (!this.head) return null

        let currentNode: ListNode | null = this.head

        while (currentNode) {
            // Если указано значение, пробуем сравнить его по значению.
            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }

            // Перематываем на один узел вперед.
            currentNode = currentNode.next;
        }
    }


    length() {
        if (!this.head) return 0

        let currentNode: ListNode | null = this.head
        let count = 0

        while (currentNode) {
            count += 1
            currentNode = currentNode.next
        }
        return count
    }
}