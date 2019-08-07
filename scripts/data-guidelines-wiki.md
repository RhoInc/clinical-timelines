The Clinical Timelines accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). The renderer visualizes clinical timelines data with **one row per participant per clinical event** plus the required variables specified below.

## Data structure
one record per participant per event with event start date/day and end date/day

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|`id_col`|_USUBJID_|**character**|unique identifier variable name|**Yes**|
|`id_characteristics[]`||**either**|an array of identifier characteristic variables and associated metadata||
|`event_col`|_DOMAIN_|**character**|event type variable name|**Yes**|
|`filters[]`||**either**|an array of filter variables and associated metadata||
|`groupings[]`||**either**|an array of categorical ID characteristic variables with which to group IDs||
|`stdt_col`|_STDT_|**character**|start date variable name - not required if start day is present|**Yes**|
|`endt_col`|_ENDT_|**character**|end date variable name||
|`stdy_col`|_STDY_|**numeric**|start day variable name - not required if start date is present|**Yes**|
|`endy_col`|_ENDY_|**character**|end day variable name||
|`seq_col`|_SEQ_|**numeric**|event type sequence variable name|**Yes**|
|`tooltip_col`|_TOOLTIP_|**character**|hovering over a mark displays a tooltip with the details of the event||
|`ongo_col`|_ONGO_|**character**|ongoing event indicator variable name||
|`offset_col`||**numeric**|the name of the variable that contains a ranking of vertical position at which to draw a mark||
|`details[]`||**either**|an array of detail listing variables and associated metadata||

## Example data
the first few records of the [test dataset](https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adtimelines.csv):

| USUBJID | DOMAIN | STDT | ENDT | STDY | ENDY | SEQ | TOOLTIP | ONGO |
|:--------|:-------|:-----|:-----|:-----|:-----|:----|:--------|:-----|
|01-001|Adverse Events|2015-07-16|2015-08-14|57|86|1|This mark definitely represents the Adverse Events domain|N|
|01-001|Concomitant Medications|2015-07-16|2015-08-14|57|86|1|This mark definitely represents the Concomitant Medications domain|Y|
|01-001|Enrollment|2015-05-21|2015-05-21|1|1|1|This mark definitely represents the Enrollment domain||