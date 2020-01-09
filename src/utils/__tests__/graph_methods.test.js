import spaceLocation from '../graph_methods';
import graph from '../../../test/fixtures/graph_2';

let space = { floor_id: 9999 };
describe('space location method', () => {
  it('gives the right output', () => {
    let result = spaceLocation(graph, space);
    expect(result).toEqual(' -  - ');
    space = { floor_id: 14 };
    result = spaceLocation(graph, space);
    expect(result).toEqual('First Floor - SweetCandy - SweetCandy');
  });
});
