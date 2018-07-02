import rule, { ruleName } from './index.mjs';
import stylelint from 'stylelint';

const testRule = stylelint.createRuleTester((processCss, context) => {
	// test for the fix property
	console.log({ fix: context.fix });

	processCss.then(
		comparisons => {
			comparisons.forEach(comparison => {
				// vanilla test if expected === actual
				if (comparison.expected !== comparison.actual) {
					console.log({ expected: comparison.expected, actual: comparison.actual });
				}
			});
		}
	);
});

testRule(rule.rule, {
	ruleName,
	fix: true,
	accept: [
	],
	reject: [
		{
			code: '.foo { text-align: right; }',
			fixed: '.foo { text-align: end; }',
			message: 'Expected a logical property (plugin/logical-properties)',
			description: 'Fixes a declaration by transforming a physical rule'
		}
	]
});
