const {parser} = require('./index')

console.log(parser("(operate,b)->b + 2;;\noperatorA(#dealId, 1 + 2)(a)"))
console.log(parser("((operate)->{a(1);a = b + 1;()->a}"));
console.log(parser("operatorA(#dealId, 1 + 2)(a);"));
console.log(parser("operatorA(#dealId, 1 + 2)"));
console.log(parser("((a) -> name)(1,2);"));
console.log(parser("variable[1][1];"));
console.log(parser('each(filter(#DFBasic, (e) -> e < 2), (r) -> r + 2)[0] * #DFBasic[2];'));
console.log(parser('(x, y) -> {x + y};'))
console.log(parser('_test1(1);'))
console.log(parser('each(filter(#DFBasic, (e) -> e < 2), (r) -> r + 2)[0] * #DFBasic[2];'));
console.log(parser('a = 1 + 2'))
console.log(parser('(x,y)->{x + 1}'))
console.log(parser('a()'))
