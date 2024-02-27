class LinkedListNode {
    constructor(value, next) {
        this.value = value
        this.next = next
    }

    change(value) {
        this.value = value
    }
}

class LinkedList {
    head = null
    tail = null

    insertStart(value) {
        let newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode
        }
    }

    insertEnd(value) {
        let newNode = new LinkedListNode(value);

        if (this.tail) this.tail.next = newNode;

        this.tail = newNode
        if (!this.tail) {
            this.tail = newNode
        }
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

    delete(value) {
        if (this.head.value === value){
            this.head = this.head.next
        }
        let currentNode = this.head

        while (currentNode.next) {
            if (currentNode.next.value === value) {
                currentNode.next = currentNode.next.next
            } else {
                currentNode = currentNode.next
            }
        }

        if (this.tail.value === value){
            this.tail = currentNode
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