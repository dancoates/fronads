import test from 'ava';
import {EitherFactory, Right, Left, Try} from '../Either';
// import {Some, None} from '../Maybe';

const NoOp = () => {};
const Identity = (ii) => ii;


test('EitherFactory', tt => {
    tt.is(EitherFactory(1, true).map(() => 2).value(), 2);
    tt.is(EitherFactory(1, false).map(() => 2).value(), 1);
});


test('Right', tt => {
    tt.is(Right(1).map(() => 2).value(), 2);
    tt.is(Right(1).leftMap(() => 'WRONG').value(), 1);
});

test('Left', tt => {
    tt.is(Left(1).leftMap(() => 2).value(), 2);
    tt.is(Left(1).map(() => 'WRONG').value(), 1);
});

test('Try', tt => {
    tt.is(Try(() => rad).isRight, false);
    tt.is(Try(() => 'rad').isRight, true);
});

test('biMap', tt => {
    tt.is(Left(1).biMap(ii => 2, null).value(), 2);
    tt.is(Right(1).biMap(null, ii => 2).value(), 2);
});


test('biFlatMap', tt => {
    tt.is(Left(1).biFlatMap(ii => 2, null), 2);
    tt.is(Right(1).biFlatMap(null, ii => 2), 2);
});



test('ap', tt => {
    tt.is(Right(10).ap(Right(ii => ii * 2)).val, 20);
    tt.is(Left(10).ap(Right(ii => ii * 2)).val, 10);
});

test('to', tt => {
    tt.is(Left(1).toMaybe().isSome, false);
    tt.is(Right(1).toMaybe().isSome, true);

    tt.deepEqual(JSON.stringify({a: Right({b: Right(2)})}), JSON.stringify({a: {b: 2}}));
    tt.deepEqual(JSON.stringify({a: Left()}), JSON.stringify({a: null}));
});



