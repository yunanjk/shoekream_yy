package com.supreme.shoekream.controller.api;

import com.supreme.shoekream.controller.CrudController;
import com.supreme.shoekream.model.dto.BuyDTO;
import com.supreme.shoekream.model.dto.MemberDTO;
import com.supreme.shoekream.model.entity.Member;
import com.supreme.shoekream.model.network.Header;
import com.supreme.shoekream.model.network.request.BoardStyleApiRequest;
import com.supreme.shoekream.model.network.request.MemberApiRequest;
import com.supreme.shoekream.model.network.response.BoardStyleApiResponse;
import com.supreme.shoekream.model.network.response.BuyListResponse;
import com.supreme.shoekream.model.network.response.MemberApiResponse;
import com.supreme.shoekream.model.network.security.KreamPrincipal;
import com.supreme.shoekream.service.BuyService;
import com.supreme.shoekream.service.MemberApiLogicService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MypageApiController {
    private final MemberApiLogicService memberApiLogicService;
//    private final MemberApiLogicService memberApiLogicService;
//    private final BuyService buyService;

//    @GetMapping ("")
//    public List<BuyListResponse> read(@AuthenticationPrincipal KreamPrincipal kreamPrincipal){
//        MemberDTO memberDTO = kreamPrincipal.toFullDto();
//        List<BuyListResponse> dto = buyService.myBuyList(memberDTO.idx());
//        System.out.println(dto);
//        return dto;
//    }

    @PostMapping("/my/changeUpload") // http://3.34.214.103:8889/api/my/changeUpload
    public Header<MemberApiResponse> profileImgUpdate(@RequestBody Header<MemberApiRequest> request, @AuthenticationPrincipal KreamPrincipal kreamPrincipal) {
        MemberApiRequest memberApiRequest = request.getData();
        MemberDTO memberDTO = memberApiRequest.toDTO();
        return memberApiLogicService.updateProfileImg(memberDTO, kreamPrincipal.idx());
    }
}
