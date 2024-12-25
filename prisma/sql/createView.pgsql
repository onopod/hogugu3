drop view public."TherapistView";
CREATE VIEW public."TherapistView" AS

select t.id, 
    case
        when t."imageFileName" != '' then concat('/therapistImg/', t.id::text, t."imageFileName")
        else ''
    end as "imageFilePath",
    case when t.name !='' then substring(t.name, 1, 1) else '' end as name0,
    concat(coalesce(p.name, '-'), ' / ', coalesce(t.city, '-')) as "prefectureAndCity",
    r."reservationCount",
    r."replyCount",
    r."replyRate",
    r."replyTime",
    r."reviewRate",
    r."reviewCount",
    case when t.created > now() - interval '30 days' then True else False end as "isNew"
from public."Therapist" as t
left join (
    select rs."therapistId", 
        count(rs.id) as "reservationCount", 
        count(rs."replyDt") as "replyCount",
        cast(case when count(rs.id) > 0 then count(rs."replyDt") / count(rs.id)else 0.0 end as real) as "replyRate",
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
