import _ from 'lodash';

export default function spaceLocation(graph, space, seperator = '-') {
  let campusName = '';
  let buildingName = '';
  let floorName = '';

  _.forEach(graph.campus, (campus) => {
    _.forEach(campus.building, (building) => {
      _.forEach(building.floor, (floor) => {
        if (floor.id === space.floor_id) {
          campusName = campus.name;
          buildingName = building.name;
          floorName = floor.name;
        }
      });
    });
  });
  return `${floorName} ${seperator} ${buildingName} ${seperator} ${campusName}`;
}
