{
	"get_popup_alertsResult" : 
	[
		{
			"Title": "Alert <?=rand(1, 999)?>",
			"Message": "dolor sit amet, consectetur adipiscing elit"
		}
		<? if (rand(0, 1)) : ?>
		,{
			"Title": "Alert <?=rand(1, 999)?>",
			"Message": "et dolore magna aliqua. Ut enim ad minim veniam Ut enim ad minim veniam Ut enim ad minim veniam incididunt ut labore "
		}
		<? endif ?>
		<? if (rand(0, 1)) : ?>
		,{
			"Title": "Alert <?=rand(1, 999)?>",
			"Message": "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
		}
		<? endif ?>
		<? if (rand(0, 1)) : ?>
		,{
			"Title": "Alert <?=rand(1, 999)?>",
			"Message": "magna aliqua. Ut enim ad minim veniam incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
		}
		<? endif ?>
	]
}