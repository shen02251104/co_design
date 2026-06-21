package com.yidesign.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yidesign.model.entity.VipBenefit;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * VIP权益Mapper
 */
@Mapper
public interface VipBenefitMapper extends BaseMapper<VipBenefit> {
    
    /**
     * 查询所有启用的权益，按排序权重排序
     */
    @Select("SELECT * FROM vip_benefit WHERE status = 1 ORDER BY sort_order ASC")
    List<VipBenefit> selectAllEnabled();
    
    /**
     * 按适用版本查询权益
     */
    @Select("SELECT * FROM vip_benefit WHERE status = 1 AND applicable_version = #{version} ORDER BY sort_order ASC")
    List<VipBenefit> selectByVersion(String version);
}