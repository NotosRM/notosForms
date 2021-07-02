module.exports = {
	purge: [],
	darkMode: "class",
	important: true,
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
			spacing: {
				"in-space": "var(--space-y)",
				"out-space": "calc(var(--space-y) * 3)",
				"pad-x": "var(--pad-x)",
				"pad-y": "var(--pad-y)",
				horizontal: "var(--space-x)"
			},
			fontSize: {
				base: ["var(--base-fs)", "var(--base-lh)"],
				md: ["var(--medium-fs)", "1em"],
				lg: ["var(--large-fs)", "1em"]
			},
			lineHeight: {
				b: "var(--base-lh)"
			},
			boxShadow: {
				"mdt-blue": "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%);"
			},
			borderWidth: {
				1: "1px"
			},

			outline: {
				0: 0,
				custom: "1px solid rgb(209, 213, 219)"
			},
			backgroundColor: {
				skin: "var(--bg-color)"
			}
		}
	},
	variants: {
		extend: {
			borderWidth: ["hover", "focus"],
			outline: ["hover", "active", "focus"],
			width: ["hover", "focus"],
			backgroundColor: ["hover", "active", "focus"]
		}
	},
	plugins: []
};
