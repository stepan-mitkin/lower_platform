pfun(text, border)

hideSnack()

snackDiv = html.div(
    {
        "position": "fixed",
        "display": "inline-block",
        "z-order": Z_SNACK,
        "background": globalTheme.background,
        "color": globalTheme.text,
        "padding": "20px",
        "width": "400px",
        "max-width": "calc(100vw - 40px)",
        "right": "20px",
        "top": "20px",
        "border": "solid 2px " + border,
        "border-left": "solid 10px " + border,
        "text": text,
        "box-shadow": "0px 0px 20px 4px rgba(0,0,0,0.38)"
    }
)

mainDiv = html.get("main")
html.add(mainDiv, snackDiv)

snackTimer = setTimeout(hideSnack, 5000)