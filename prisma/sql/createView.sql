CREATE OR REPLACE VIEW  "TherapistView" AS
select t.id, cast(avg(rv.rate) as real) as rate_average
from public."Therapist" as t
left join public."Reservation" as r
on t.id = r."therapistId"
left join public."Review" as rv
on r.id = rv."reservationId"
group by t.id;