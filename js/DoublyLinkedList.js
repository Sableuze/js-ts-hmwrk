class DoublyLinkedListNode {
    constructor(value, previous, next) {
        this.value = value;
        this.previous = previous;
        this.next = next;
    }

    change(value) {
        this.value = value
    }

}

class DoublyLinkedList {
    head = null;
    tail = null;


    insertStart(value) {
        if (this.head === null) {
            const node = new DoublyLinkedListNode(value, null, null);
            this.head = node;
            this.tail = node;
        } else {
            const node = new DoublyLinkedListNode(value, null, this.head);
            this.head.previous = node;
            this.head = node;
        }
    }

    insertEnd(value) {
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
        if (this.head === this.tail) {
            this.head = null
            this.tail = null
        } else {
            this.head = this.head.next
            this.head.previous = null
        }
    }

    deleteEnd() {
        if (this.head === this.tail) {
            this.head = null
            this.tail = null
        } else {
            this.tail = this.tail.previous
            this.tail.next = null
        }
    }

    delete(value) {
        // Если нет head значит список пуст.
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode = this.head;

        // Перебираем все узлы и удаляем их, если их значение равно указанному.
        while (currentNode) {
            if (currentNode.value === value) {
                // Сохраняем значение текущего узла как удаленное.
                deletedNode = currentNode;

                // Если head должен быть удален,
                if (deletedNode === this.head) {
                    // то делаем следующий узел новым head
                    this.head = deletedNode.next;

                    // Меняем в новом head ссылку (previous) на null.
                    if (this.head) {
                        this.head.previous = null;
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
                    this.tail = deletedNode.previous;
                    // Обновляем ссылку next в новом хвосте.
                    this.tail.next = null;
                } else {
                    // Если средний узел будет удален, -
                    // сохраняем ссылку на предыдущий элемент,
                    const previousNode = deletedNode.previous;
                    // и сохраняем ссылку на следующий элемент.
                    const nextNode = deletedNode.next;
                    // Меняем ссылки у предыдущего и следующего узлов от удаленного узла,
                    // чтобы они больше не ссылались на удаленный узел.
                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }

            // Перематываем на один узел вперёд.
            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    find(value) {
        if (!this.head) return null

        let currentNode = this.head

        while (currentNode) {
            // Если указано значение, пробуем сравнить его по значению.
            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }

            // Перематываем на один узел вперед.
            currentNode = currentNode.next;
        }
    }


    length(){
        if (!this.head) return 0

        let currentNode = this.head
        let count = 0

        while (currentNode) {
            count += 1
            currentNode = currentNode.next
        }
        return count
    }
}