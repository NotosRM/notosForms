module.exports = {
	purge: [],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: "var(--brand-primary)",
				secondary: "var(--brand-secondary)",
				success: "var(--brand-primary)",
				info: "var(--brand-info)",
				warning: "var(--brand-warning)",
				danger: "var(--brand-danger)",
				fatal: "var(--brand-fatal)",
				base: {
					primary: "var(--base-primary)",
					secondary: "var(--base-secondary)",
					text: "var(--base-text)"
				}
			},
			fontSize: {
				base: "12px"
			},
			boxShadow: {
				"mdt-blue": "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%);"
			},
			borderWidth: {
				1: "1px"
			},
			outline: {
				0: 0
			},
			backgroundColor: {
				skin: "var(--bg-color)"
			}
		}
	},
	variants: {},
	plugins: []
};
