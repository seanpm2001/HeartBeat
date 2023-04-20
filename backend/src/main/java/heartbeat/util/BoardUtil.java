package heartbeat.util;

import heartbeat.controller.board.vo.StatusChangedArrayItem;
import heartbeat.controller.board.vo.request.CardStepsEnum;
import heartbeat.controller.board.vo.response.CycleTimeInfo;
import heartbeat.service.report.WorkDayUtil;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class BoardUtil {

	WorkDayUtil workDayUtil;

	public List<StatusChangedArrayItem> reformTimeLineForFlaggedCards(List<StatusChangedArrayItem> statusChangedArray) {
		List<Integer> needToFilterArray = new ArrayList<>();
		List<StatusChangedArrayItem> timeLine = statusChangedArray.stream()
			.sorted(Comparator.comparingInt(StatusChangedArrayItem::getTimestamp))
			.toList();

		for (int i = 0; i < timeLine.size(); i++) {
			StatusChangedArrayItem statusChangedArrayItem = timeLine.get(i);
			if (!Objects.equals(statusChangedArrayItem.getStatus(), CardStepsEnum.FLAG.getValue())) {
				continue;
			}
			String statusNameAfterBlock = CardStepsEnum.UNKNOWN.getValue();
			if (i > 0) {
				statusNameAfterBlock = timeLine.get(i - 1).getStatus();
			}
			for (int j = i + 1; j < timeLine.size(); j++) {
				if (Objects.equals(timeLine.get(j).getStatus(), CardStepsEnum.REMOVEFLAG.getValue())) {
					timeLine.get(j).setStatus(statusNameAfterBlock);
					break;
				}
				statusNameAfterBlock = timeLine.get(j).getStatus();
				needToFilterArray.add(timeLine.get(j).getTimestamp());
			}
		}
		return timeLine.stream().filter(activity -> !needToFilterArray.contains(activity.getTimestamp())).toList();
	}

	public List<CycleTimeInfo> getCardTimeForEachStep(List<StatusChangedArrayItem> statusChangedArrayItems) {
		Map<String, Double> result = new HashMap<>();
		for (int i = 0; i < statusChangedArrayItems.size(); i++) {
			StatusChangedArrayItem statusChangedArrayItem = statusChangedArrayItems.get(i);
			String status = statusChangedArrayItem.getStatus().toUpperCase();
			double addedTime = result.getOrDefault(status, 0.0);
			double costedTime = getThisStepCostTime(i, statusChangedArrayItems);
			double value = addedTime + costedTime;
			result.put(status, value);
		}
		List<CycleTimeInfo> cycleTimeInfos = new ArrayList<>();
		for (Map.Entry<String, Double> entry : result.entrySet()) {
			String key = entry.getKey();
			Double value = entry.getValue();
			cycleTimeInfos.add(CycleTimeInfo.builder().column(key).day(value).build());
		}
		return cycleTimeInfos;
	}

	public double getThisStepCostTime(int index, List<StatusChangedArrayItem> statusChangedArrayItems) {
		if (index < statusChangedArrayItems.size() - 1) {
			return workDayUtil.calculateWorkDaysBy24Hours(statusChangedArrayItems.get(index).getTimestamp(),
					statusChangedArrayItems.get(index + 1).getTimestamp());
		}
		return workDayUtil.calculateWorkDaysBy24Hours(statusChangedArrayItems.get(index).getTimestamp(),
				System.currentTimeMillis());
	}

}
