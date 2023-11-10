import dayjs from "dayjs";

export const MapFingle = (record: [], leave: [], fingle: [], month: string) => {
  let dsDay = {};
  const mapfingle = fingle.map((item: any) => {
    for (let index = 1; index <= dayjs(month).daysInMonth(); index++) {
      let dateString = index < 10 ? `0${index}` : `${index}`;
      const findLeave: any = leave.filter(
        (itemLeave: any) =>
          item.ID == itemLeave.LEAVE_PERSON_ID &&
          dayjs(itemLeave.LEAVE_DATE_BEGIN).format("YYYY-MM-DD") <=
            `${month}-${dateString}` &&
          dayjs(itemLeave.LEAVE_DATE_END).format("YYYY-MM-DD") >=
            `${month}-${dateString}`
      );
      dsDay = {
        ...dsDay,
        [`ds${index}`]:
          record.filter(
            (itemRecord: any) =>
              item.ID == itemRecord.HR_ID &&
              dayjs(itemRecord.DATE_GO).format("YYYY-MM-DD") <=
                `${month}-${dateString}` &&
              dayjs(itemRecord.DATE_BACK).format("YYYY-MM-DD") >=
                `${month}-${dateString}`
          ).length > 0
            ? "ไปราชการ"
            : findLeave.length > 0
            ? findLeave[0].LEAVE_TYPE_NAME
            : item?.[`ds${index}`],
        [`de${index}`]:
          record.filter(
            (itemRecord: any) =>
              item.ID == itemRecord.HR_ID &&
              dayjs(itemRecord.DATE_GO).format("YYYY-MM-DD") <=
                `${month}-${dateString}` &&
              dayjs(itemRecord.DATE_BACK).format("YYYY-MM-DD") >=
                `${month}-${dateString}`
          ).length > 0
            ? "ไปราชการ"
            : findLeave.length > 0
            ? findLeave[0].LEAVE_TYPE_NAME
            : item?.[`de${index}`],
      };
    }
    return {
      ...item,
      ...dsDay,
    };
  });
  return mapfingle;
};
