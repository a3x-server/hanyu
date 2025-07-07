import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

export default [
	...compat.config({
		extends: [
			'standard',
			'prettier',
		],
	}),

	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			// ❌ Eliminar punto y coma
			semi: [
				'error',
				'never',
			],

			// ↹ Usar 4 espacios en lugar de tabulaciones
			indent: [
				'error',
				4,
			],
			// ✅ Usar comillas simples
			quotes: [
				'error',
				'single',
				{
					avoidEscape: true,
				},
			],
			// ✅ Usar comillas simples en JSX
			'jsx-quotes': [
				'error',
				'prefer-single',
			],
			'linebreak-style': [
				'error',
				'unix',
			],
			// "no-tabs": "error", // No Permitir tabulaciones (deshabilitado para permitir espacios)

			// ✅ Otras reglas útiles
			'no-multiple-empty-lines': [
				'error',
				{
					max: 1,
				},
			],
			'comma-dangle': [
				'error',
				'never',
			],
			'object-curly-spacing': [
				'error',
				'always',
			],
			'array-bracket-spacing': [
				'error',
				'never',
			],
			'no-trailing-spaces': 'error',
			'eol-last': [
				'error',
				'always',
			],
		},
	},
]
