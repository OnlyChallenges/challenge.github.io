addLayer("s", {
    name: "secret", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "s", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            secret: new Decimal(0),
        }
    },
    type: "side",
    layerShown: false,
    clickables:{
        11: {
            title: "You found a secret",
            display: "Secret",
            canClick: true,
            onClick() {
                player.s.secret =1 
            },
            style() {return{
                'background-color': tmp.W.color,
            }},
            unlocked() {return player.s.secret == 0}
        },
    },
})
