import test from 'ava';
import {
    StateFunctorFactoryFactory as StateFunctorFactory,
} from '../StateFunctor';

const {ViewState, EditState} = StateFunctorFactory(['View', 'Edit']);

test('StateFunctor map/flatmap/unit', tt => {
    tt.is(ViewState('foo').viewMap(() => 'bar').value(), 'bar');
    tt.is(ViewState('foo').editMap(() => 'bar').value(), 'foo');

    tt.is(EditState('foo').viewMap(() => 'bar').value(), 'foo');
    tt.is(EditState('foo').editMap(() => 'bar').value(), 'bar');
});


test('StateFunctor.value', tt => {
    tt.is(ViewState('bar').value('foo'), 'bar');
    tt.is(ViewState().value('foo'), 'foo');
});

test('StateFunctor.to', tt => {
    tt.is(ViewState('bar').toEdit().editMap(ii => 'foo').value(), 'foo');
    tt.is(ViewState('bar').toEdit().viewMap(ii => 'foo').value(), 'bar');
});
