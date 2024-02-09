package com.cryptosoft.dtos;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AssignAttendanceRequest {

    private List<Integer> studentIds;
    private Integer courseId;
    private Integer batchId;
    private LocalDate date;

}
