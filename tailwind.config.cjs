/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-color": "#252329",
        "chat-text-color": "#E0E0E0",
        "sidebar-color": "#252329",
        "sidebar-nav-color": "#120F13",
        blue: "#2D9CDB",
        "input-background": "#3C393F",
        "message-detail-color": "#828282",
        "channel-name": "#BDBDBD",
        send: "#2F80ED",
        logout: "#EB5757",
        "modal-background": "rgba(18, 15, 19, 0.5)",
        "login-button": "#0085ff",
      },
      boxShadow: {
        "nav-shadow": "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
    fontFamily: {
      noto: "Noto Sans",
    },
  },
  plugins: [],
};
