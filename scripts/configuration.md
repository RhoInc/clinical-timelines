## settings.id_col
`string`

unique identifier variable name

**default:** `"USUBJID"`



## settings.id_unit
`string`

unique identifier unit

**default:** `"participant"`



## settings.id_characteristics
`array`

an array of identifier characteristic variables and associated metadata

**default:** none
### settings.id_characteristics.value_col
`string`

Variable name

### settings.id_characteristics.label
`string`

Variable label





## settings.event_col
`string`

event type variable name

**default:** `"DOMAIN"`



## settings.event_types
`array`

an array of event types displayed initially

**default:** none



## settings.event_highlighted
`string`

highlighted event type

**default:** none



## settings.event_highlight_color
`string`

fill color of highlighted events

**default:** none



## settings.filters
`array`

an array of filter variables and associated metadata

**default:** none
### settings.filters.value_col
`string`

Variable name

### settings.filters.label
`string`

Variable label





## settings.site_col
`string`

site variable name

**default:** `"SITE"`



## settings.groupings
`array`

an array of categorical ID characteristic variables with which to group IDs

**default:** none
### settings.groupings.value_col
`string`

Variable name

### settings.groupings.label
`string`

Variable label





## settings.grouping_initial
`string`

initial ID grouping variable

**default:** none



## settings.grouping_direction
`string`

grouping annotation placement, 'horizontal' or 'vertical'

**default:** `"horizontal"`



## settings.time_scale
`string`

the time scale on which to plot events

**default:** `"Study Day"`



## settings.stdy_col
`string`

start day variable name

**default:** `"STDY"`



## settings.endy_col
`string`

end day variable name

**default:** `"ENDY"`



## settings.study_day_range
`array`

start and stop days with which to define the x-axis domain

**default:** none



## settings.stdt_col
`string`

start date variable name

**default:** `"STDT"`



## settings.endt_col
`string`

end date variable name

**default:** `"ENDT"`



## settings.date_range
`array`

start and stop dates with which to define the x-axis domain and which match settings.date_format

**default:** none



## settings.date_format
`string`

date format of input variables

**default:** `"%Y-%m-%d"`



## settings.date_display_format
`string`

date format of x-axis

**default:** `"%Y-%m-%d"`



## settings.seq_col
`string`

event type sequence variable name

**default:** `"SEQ"`



## settings.tooltip_col
`string`

hovering over a mark displays a tooltip with the details of the event

**default:** `"TOOLTIP"`



## settings.ongo_col
`string`

ongoing event indicator variable name

**default:** `"ONGO"`



## settings.ongo_val
`string`

ongoing event indicator value

**default:** `"Y"`



## settings.reference_lines
`array`

an array of reference timepoints and associated descriptions

**default:** none
### settings.reference_lines.studyDay
`number`

Study day

### settings.reference_lines.label
`string`

Reference day description





## settings.details
`array`

an array of detail listing variables and associated metadata

**default:** none
### settings.details.value_col
`string`

Variable name

### settings.details.label
`string`

Variable label





## settings.details_config
`object`

a webcharts table settings object



