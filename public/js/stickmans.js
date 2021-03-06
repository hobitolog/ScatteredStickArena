var sticks = {

    user: {
        elements: new Map(),
        weaponUrl: "items/buzdygan.png",
        color: 'black'
    },
    enemy: {
        elements: new Map(),
        weaponUrl: "items/buzdygan.png",
        color: 'red'
    },
    hitTip: {},

    setWeapons: function (user, enemy) {
        if(user)
            this.user.weaponUrl = user
        if(enemy)
            this.enemy.weaponUrl = enemy
    },

    setColors: function (user, enemy) {
        this.user.color = user
        this.enemy.color = enemy
    },

    initialize: function () {

        this.user.elements.set("head", new fabric.Circle({
            selectable: false, scalable: false,
            radius: 20, fill: this.user.color, left: 200, top: 175, name: 'stickman'
        }))
        this.user.elements.set("line", makeLine([200, 175, 200, 275], this.user.color))
        this.user.elements.set("leg1", makeLine([200, 275, 195, 320], this.user.color))
        this.user.elements.set("leg2", makeLine([200, 275, 215, 320], this.user.color))
        this.user.elements.set("leg3", makeLine([195, 320, 185, 350], this.user.color))
        this.user.elements.set("leg4", makeLine([215, 320, 205, 350], this.user.color))
        this.user.elements.set("arm1", makeLine([200, 190, 220, 230], this.user.color))
        this.user.elements.set("arm2", makeLine([220, 230, 250, 250], this.user.color))
        this.user.elements.set("arm3", makeLine([200, 190, 180, 230], this.user.color))
        this.user.elements.set("arm4", makeLine([180, 230, 190, 250], this.user.color))

        fabric.Image.fromURL(this.user.weaponUrl, function (obj) {
            obj.set({ left: 270, top: 200 })
            obj.selectable = false
            obj.scalable = false
            sticks.user.weapon = obj
            canvas.add(obj)
            obj.bringToFront()
        })

        fabric.loadSVGFromURL('svg/slash.svg', function (objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options)
            obj.scale(0.3)
            obj.set({ left: 310, top: 230 })
            obj.selectable = false
            obj.scalable = false
            sticks.user.slash = obj
        })

        this.enemy.elements.set("head", new fabric.Circle({
            selectable: false, scalable: false,
            radius: 20, fill: this.enemy.color, left: 470, top: 175, name: 'opponent'
        }))
        this.enemy.elements.set("line", makeLine([470, 175, 470, 275], this.enemy.color))
        this.enemy.elements.set("leg1", makeLine([470, 275, 455, 320], this.enemy.color))
        this.enemy.elements.set("leg2", makeLine([470, 275, 475, 320], this.enemy.color))
        this.enemy.elements.set("leg3", makeLine([455, 320, 465, 350], this.enemy.color))
        this.enemy.elements.set("leg4", makeLine([475, 320, 485, 350], this.enemy.color))
        this.enemy.elements.set("arm1", makeLine([470, 190, 450, 230], this.enemy.color))
        this.enemy.elements.set("arm2", makeLine([450, 230, 420, 250], this.enemy.color))
        this.enemy.elements.set("arm3", makeLine([470, 190, 490, 230], this.enemy.color))
        this.enemy.elements.set("arm4", makeLine([490, 230, 480, 250], this.enemy.color))


        fabric.Image.fromURL(this.enemy.weaponUrl, function (obj) {
            obj.set({ left: 400, top: 200 })
            obj.set('flipX', true)
            obj.selectable = false
            obj.scalable = false
            sticks.enemy.weapon = obj
            canvas.add(obj)
            obj.bringToFront()
        })

        fabric.loadSVGFromURL('svg/slash.svg', function (objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options)
            obj.scale(0.3)
            obj.set('flipX', true)
            obj.set({ left: 350, top: 230 })
            obj.selectable = false
            obj.scalable = false
            sticks.enemy.slash = obj
        })

        var polygonPoints = [
            { x: 85, y: 0 },
            { x: 110, y: 40 },
            { x: 120, y: 30 },
            { x: 122, y: 43 },
            { x: 137, y: 45 },
            { x: 180, y: 35 },
            { x: 160, y: 60 },
            { x: 220, y: 45 },
            { x: 180, y: 80 },
            { x: 210, y: 90 },
            { x: 180, y: 105 },
            { x: 190, y: 140 },
            { x: 175, y: 135 },
            { x: 190, y: 165 },
            { x: 150, y: 140 },
            { x: 150, y: 150 },
            { x: 125, y: 140 },
            { x: 107, y: 192 },
            { x: 100, y: 140 },
            { x: 75, y: 160 },
            { x: 80, y: 140 },
            { x: 60, y: 150 },
            { x: 70, y: 130 },
            { x: 0, y: 150 },
            { x: 57, y: 105 },
            { x: 35, y: 100 },
            { x: 60, y: 90 },
            { x: 30, y: 70 },
            { x: 60, y: 70 },
            { x: 45, y: 50 },
            { x: 75, y: 60 },
            { x: 70, y: 35 },
            { x: 85, y: 45 }
        ]
        this.hitTip.polygon = new fabric.Polygon(polygonPoints, {
            scaleX: 0.6,
            scaleY: 0.6,
            left: 350,
            top: 130,
            fill: 'red',
            selectable: false,
            objectCaching: false,
        })
        this.hitTip.polygonText = new fabric.Text(String("hit"), {
            left: 350,
            top: 130,
            selectable: false,
            scalable: false,
            name: 'arenaAlert',
            fill: 'white',
            fontSize: 22,
            fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
            textAlign: 'center',
        });

        addToCanvas(sticks.user)
        addToCanvas(sticks.enemy)
    },

    bringToFront: function () {
        this.user.elements.forEach(element => {
            element.bringToFront()
        })
        this.enemy.elements.forEach(element => {
            element.bringToFront()
        })
        if (this.user.weapon)
            this.user.weapon.bringToFront()
        if (this.enemy.weapon)
            this.enemy.weapon.bringToFront()
    },

    animateUserAttack() {
        canvas.add(this.user.slash)
        this.user.weapon.angle = 90
        this.user.weapon.set({ left: 295, top: 275 })
        this.user.weapon.bringToFront()
        canvas.renderAll()
        setTimeout(function () {
            canvas.remove(sticks.user.slash)
            sticks.user.weapon.angle = 0
            sticks.user.weapon.set({ left: 270, top: 200 })
            canvas.renderAll()
        }, 1000)
    },

    animateEnemyAttack() {
        canvas.add(this.enemy.slash)
        this.enemy.weapon.angle = 90
        this.enemy.weapon.set({ left: 380, top: 275 })
        this.enemy.weapon.set('flipY', true)
        this.enemy.weapon.set('flipX', false)
        this.enemy.weapon.bringToFront()
        canvas.renderAll()
        setTimeout(function () {
            canvas.remove(sticks.enemy.slash)
            sticks.enemy.weapon.angle = 0
            sticks.enemy.weapon.set({ left: 400, top: 200 })
            sticks.enemy.weapon.set('flipY', false)
            sticks.enemy.weapon.set('flipX', true)
            canvas.renderAll()
        }, 1000)
    },

    animateDamageHint(damage) {
        if (damage) {
            this.hitTip.polygonText.text = damage.toString()
            this.hitTip.polygon.fill = 'red'
        }
        else {
            this.hitTip.polygonText.text = "miss"
            this.hitTip.polygon.fill = 'blue'
        }

        canvas.add(this.hitTip.polygon)
        canvas.add(this.hitTip.polygonText)
        this.hitTip.polygon.bringToFront()
        this.hitTip.polygonText.bringToFront()
        canvas.renderAll()
        setTimeout(function () {
            canvas.remove(sticks.hitTip.polygon)
            canvas.remove(sticks.hitTip.polygonText)
            canvas.renderAll()
        }, 1000)
    }
}

function addToCanvas(user) {
    user.elements.forEach(element => {
        canvas.add(element)
    })
}

function makeLine(coords, color) {
    return new fabric.Line(coords, {
        stroke: color,
        strokeWidth: 5,
        strokeLineCap: 'round',
        selectable: false,
        scalable: false,
    })
}