import { buildTimeGridColumns } from './grid.support';

describe('grid.support', () => {
  describe('buildTimeGridColumns', () => {
    it('test1', () => {
      const columns = buildTimeGridColumns({}, {hourFrom: 2, hourTo: 4});
      expect(columns[0].name).toEqual('02:00');
      expect(columns[1].name).toEqual('02:10');
      expect(columns[2].name).toEqual('02:20');
      expect(columns[3].name).toEqual('02:30');
      expect(columns[4].name).toEqual('02:40');
      expect(columns[5].name).toEqual('02:50');
      expect(columns[6].name).toEqual('03:00');
      expect(columns[7].name).toEqual('03:10');
      expect(columns[8].name).toEqual('03:20');
      expect(columns[9].name).toEqual('03:30');
      expect(columns[10].name).toEqual('03:40');
      expect(columns[11].name).toEqual('03:50');
      expect(columns[12].name).toEqual('04:00');
      expect(columns[13].name).toEqual('04:10');
      expect(columns[14].name).toEqual('04:20');
      expect(columns[15].name).toEqual('04:30');
      expect(columns[16].name).toEqual('04:40');
      expect(columns[17].name).toEqual('04:50');
    });

    it('test2', () => {
      const columns = buildTimeGridColumns({}, {hourFrom: 2, hourTo: 4, minPeriodAtMinutes: 30});
      expect(columns[0].name).toEqual('02:00');
      expect(columns[1].name).toEqual('02:30');
      expect(columns[2].name).toEqual('03:00');
      expect(columns[3].name).toEqual('03:30');
      expect(columns[4].name).toEqual('04:00');
      expect(columns[5].name).toEqual('04:30');
    });

    it('test3', () => {
      const columns = buildTimeGridColumns({}, {hourFrom: 2, hourTo: 4, minPeriodAtMinutes: 60});
      expect(columns[0].name).toEqual('02:00');
      expect(columns[1].name).toEqual('03:00');
      expect(columns[2].name).toEqual('04:00');
    });

    it('test4', () => {
      const columns = buildTimeGridColumns({}, {minPeriodAtMinutes: 30});
      expect(columns[0].name).toEqual('00:00');
      expect(columns[1].name).toEqual('00:30');
      expect(columns[2].name).toEqual('01:00');
      expect(columns[3].name).toEqual('01:30');
      expect(columns[4].name).toEqual('02:00');
      expect(columns[5].name).toEqual('02:30');
      expect(columns[6].name).toEqual('03:00');
      expect(columns[7].name).toEqual('03:30');
      expect(columns[8].name).toEqual('04:00');
      expect(columns[9].name).toEqual('04:30');
      expect(columns[10].name).toEqual('05:00');
      expect(columns[11].name).toEqual('05:30');
      expect(columns[12].name).toEqual('06:00');
      expect(columns[13].name).toEqual('06:30');
      expect(columns[14].name).toEqual('07:00');
      expect(columns[15].name).toEqual('07:30');
      expect(columns[16].name).toEqual('08:00');
      expect(columns[17].name).toEqual('08:30');
      expect(columns[18].name).toEqual('09:00');
      expect(columns[19].name).toEqual('09:30');
      expect(columns[20].name).toEqual('10:00');
      expect(columns[21].name).toEqual('10:30');
      expect(columns[22].name).toEqual('11:00');
      expect(columns[23].name).toEqual('11:30');
      expect(columns[24].name).toEqual('12:00');
      expect(columns[25].name).toEqual('12:30');
      expect(columns[26].name).toEqual('13:00');
      expect(columns[27].name).toEqual('13:30');
      expect(columns[28].name).toEqual('14:00');
      expect(columns[29].name).toEqual('14:30');
      expect(columns[30].name).toEqual('15:00');
      expect(columns[31].name).toEqual('15:30');
      expect(columns[32].name).toEqual('16:00');
      expect(columns[33].name).toEqual('16:30');
      expect(columns[34].name).toEqual('17:00');
      expect(columns[35].name).toEqual('17:30');
      expect(columns[36].name).toEqual('18:00');
      expect(columns[37].name).toEqual('18:30');
      expect(columns[38].name).toEqual('19:00');
      expect(columns[39].name).toEqual('19:30');
      expect(columns[40].name).toEqual('20:00');
      expect(columns[41].name).toEqual('20:30');
      expect(columns[42].name).toEqual('21:00');
      expect(columns[43].name).toEqual('21:30');
      expect(columns[44].name).toEqual('22:00');
      expect(columns[45].name).toEqual('22:30');
      expect(columns[46].name).toEqual('23:00');
      expect(columns[47].name).toEqual('23:30');
    });

    it('test5', () => {
      const columns = buildTimeGridColumns({}, {minPeriodAtMinutes: 180});
      expect(columns[0].name).toEqual('00:00');
      expect(columns[1].name).toEqual('03:00');
      expect(columns[2].name).toEqual('06:00');
      expect(columns[3].name).toEqual('09:00');
      expect(columns[4].name).toEqual('12:00');
      expect(columns[5].name).toEqual('15:00');
      expect(columns[6].name).toEqual('18:00');
      expect(columns[7].name).toEqual('21:00');
    });
  });
});
