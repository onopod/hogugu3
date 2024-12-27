drop view if exists public."TherapistView";
CREATE VIEW public."TherapistView" AS

with t as (
    select * , 
    EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - "lastLoginDt")) AS "lastLoginSecond"
    from public."Therapist"
)
select t.id, 
    t."lastLoginSecond",
    case when "lastLoginSecond" / (60 * 60 * 24 * 365) >= 1 then concat(cast(floor("lastLoginSecond" / (60 * 60 * 24 * 365)) as varchar), '年前')
        when "lastLoginSecond" / (60 * 60 * 24 * 31) >= 1 then concat(cast(floor("lastLoginSecond" / (60 * 60 * 24 * 31)) as varchar), 'ヶ月前')
        when "lastLoginSecond" / (60 * 60 * 24 * 7) >= 1 then concat(cast(floor("lastLoginSecond" / (60 * 60 * 24 * 7)) as varchar), '週間前')
        when "lastLoginSecond" / (60 * 60 * 24) >= 1 then concat(cast(floor("lastLoginSecond" / (60 * 60 * 24 )) as varchar), '日前')
        when "lastLoginSecond" / (60 * 60) >= 1 then concat(cast(floor("lastLoginSecond" / (60 * 60 )) as varchar), '時間前')
        when "lastLoginSecond" / 60 >= 1 then concat(cast(floor("lastLoginSecond" / 60) as varchar), '分前')
        else '数秒前'
    end as "lastLogin",
    case
        when t."imageFileName" != '' then concat('/therapistImg/', t.id::text, '/', t."imageFileName")
        else ''
    end as "imageFilePath",
    case when t.name !='' then substring(t.name, 1, 1) else '' end as name0,
    concat(coalesce(p.name, '-'), ' / ', coalesce(concat(c.country, c.city, c.ward), '-')) as "prefectureAndCity",
    r."reservationCount",
    r."replyCount",
    r."replyRate",
    case when r."replyRate" is not null then cast(r."replyRate" * 100 as int) else null end as "replyRateFixed",
    r."replyTime",
    r."reviewRate",
    r."reviewCount",
    case when t.created > now() - interval '30 days' then True else False end as "isNew",
    m."minMenuPrice"
from t
left join (
    select rs."therapistId", 
        count(rs.id) as "reservationCount", 
        count(rs."replyDt") as "replyCount",
        cast(case when count(rs.id) > 0 then count(rs."replyDt") / cast(count(rs.id) as real) else 0.0 end as real) as "replyRate",
        cast(avg(case when rs."replyDt" is not null then EXTRACT(MINUTE FROM (rs."replyDt" - rs.created)) else null end) as int) as "replyTime",
        cast(avg(rv.rate) as real) as "reviewRate",
        count(rv.id) as "reviewCount"
    from public."Reservation" as rs
    left join public."Review" as rv
    on rs.id = rv."reservationId"
    group by rs."therapistId"
) as r
on t.id = r."therapistId"
left join public."Prefecture" as p
on t."prefectureId" = p."id"
left join (
    select "therapistId", min(price) as "minMenuPrice" from public."TherapistsOnMenus"
    group by "therapistId"
 ) as m
on t.id = m."therapistId"
left join public."City" as c
on t."cityId" = c.id;

select * from public."TherapistView";