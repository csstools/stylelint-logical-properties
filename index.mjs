import stylelint from 'stylelint';
import parser from 'postcss-values-parser';
export const ruleName = 'plugin/logical-properties';

export default stylelint.createPlugin(ruleName, primaryOption => (root, result) => {
	// validate options
	const validOptions = stylelint.utils.validateOptions({
		ruleName,
		result,
		actual: primaryOption,
	});

	// reject invalid options
	if (!validOptions) {
		return;
	}

	// walk all postcss nodes
	root.walk(node => {
		if (isDecl(node)) {
			const ast = parser(node.value).parse();

			ast.walk(vnode => {
				// report physical properties
				if (isPhysicalProperty(vnode)) {
					stylelint.utils.report({
						ruleName,
						result,
						message: messages.expected,
						node,
						...vnode.source.start
					});
				}
			})
		}
	});
});

export const messages = stylelint.utils.ruleMessages(ruleName, {
	expected: 'Expected a logical property',
});

const isDecl = node => node.type === 'decl';
const isPhysicalProperty = node => node.type === 'word' && node.value === 'right'; // <= just testing for now
