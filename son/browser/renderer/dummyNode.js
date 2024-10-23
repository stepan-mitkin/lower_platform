pfun(color, padding)

return {
    render: container => {
        dummy = html.div({
            display: "inline-block",
            position: "absolute",
            left: padding + "px",
            top: padding + "px",
            right: padding + "px",
            bottom: padding + "px",
            background: color
        })
        html.add(container, dummy)
    }
}