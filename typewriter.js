class TypeWriter {
    #defaults = {
        pauseMin: 170,
        pauseMax: 230,
        keepBlinking: true,
        className: 'typewriter',
        cursor: '|'
    };
    #params;
    #node;
    #tasks = [];
    #executing = false;

    constructor(node, params) {
        this.#node = node;
        this.#params = {...this.#defaults, ...params};
        this.#node.classList.add(this.#params.className);
        this.#node.dataset['cursor'] = this.#params.cursor;
    }

    write( text ) {
        let _this = this;
        [...text].forEach((c) => {
            _this.#tasks.push({
                'type': 'write',
                'char': c
            })
        });
        this.#start();
        return this;
    }

    delete( n = 1 ) {
        for(let i=0; i<n; i++) {
            this.#tasks.push({
                'type': 'delete',
                'all': false
            });
        }
        this.#start();
        return this;
    }

    wait( t=1000 ) {
        this.#tasks.push({
            'type': 'wait',
            't': t
        });
        this.#start();
        return this;
    }

    wipe() {
        this.#tasks.push({
            'type': 'delete',
            'all': true
        });
        this.#start();
        return this;
    }

    config( params ) {
        this.#tasks.push({
            'type': 'config',
            'params': params
        });
        return this;
    }

    #start() {
        if ( !this.#executing ) {
            this.#execute();
        }
    }

    #execute() {
        if ( this.#tasks.length > 0 ) {
            this.#executing = true;
            const task = this.#tasks.shift();
            let pause = this.#randomInt(this.#params.pauseMin, this.#params.pauseMax)

            if ( task.type == 'write' ) {
                setTimeout(()=>{
                    this.#add(task.char);
                    this.#execute();
                }, pause);
            } else if ( task.type == 'delete' ) {
                setTimeout(()=>{
                    this.#remove(task.all);
                    this.#execute();
                }, pause);
            } else if ( task.type == 'wait' ) {
                setTimeout(()=>{
                    this.#execute();
                }, task.t);
            } else if ( task.type == 'config' ) {
                this.#params = {...this.#params, ...task.params};
                this.#execute();
            }
        } else {
            this.#executing = false;
            this.#finish();
        }
    }

    #add(c) {
        this.#node.innerHTML += c;
    }

    #remove( all = false ) {
        if ( all ) {
            this.#node.innerHTML = ''; 
        } else {
            this.#node.innerHTML = 
            this.#node.innerHTML.substring(0, this.#node.innerHTML.length-1);
        }
    }

    #finish() {
        if ( !this.#params.keepBlinking ) {
            this.#node.classList.add('noblink');
        }
    }

    #randomInt = (min, max) => {
        return Math.random() * (max - min) + min;
    }
}