package com.yidesign.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yidesign.model.entity.VipPackage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * VIP套餐Mapper
 */
@Mapper
public interface VipPackageMapper extends BaseMapper<VipPackage> {
    
    /**
     * 查询所有启用的套餐，按排序权重排序
     */
    @Select("SELECT * FROM vip_package WHERE status = 1 ORDER BY sort_order ASC")
    List<VipPackage> selectAllEnabled();
    
    /**
     * 按使用类型查询套餐
     */
    @Select("SELECT * FROM vip_package WHERE status = 1 AND usage_type = #{usageType} ORDER BY sort_order ASC")
    List<VipPackage> selectByUsageType(String usageType);
    
    /**
     * 按版本类型查询套餐
     */
    @Select("SELECT * FROM vip_package WHERE status = 1 AND version = #{version} ORDER BY sort_order ASC")
    List<VipPackage> selectByVersion(String version);
}