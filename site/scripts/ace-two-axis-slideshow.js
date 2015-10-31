
$(document).ready(function(){

	var TRANSITION_TIME = 0.6;

	
	var $container = $(".page-two .main");
	$container.data("project", 0);

	var $projects = $container.find(".main__project");

	$projects.each(function() {
		$(this).data("group", 0);
	})

	console.log($projects.first().find(".carousel .group").first());

	TweenMax.to($projects.first().find(".carousel .group").first(), TRANSITION_TIME, {left: "0%"});	


	var prevProject = function() {
		var $oldProject = $projects.eq( $container.data("project") );
		TweenMax.to($oldProject, TRANSITION_TIME, {top: "100%"});

		$container.data("project", $container.data("project") - 1);
		if ($container.data("project") == -1) {
			$container.data("project", $projects.length - 1);
		}

		var $newProject = $projects.eq( $container.data("project") );
		$newProject.data("group", 0);
		var $firstGroup = $newProject.find(".carousel .group").eq(0);
		TweenMax.to($firstGroup, 0, {left: "0%"});
		TweenMax.fromTo($newProject, TRANSITION_TIME, {top: "-100%"}, {delay: 0.1, top: "0%"});

		console.log("change project to ", $container.data("project"));

		updateProjectNav();
	}

	var nextProject = function() {
		var $oldProject = $projects.eq( $container.data("project") );
		TweenMax.to($oldProject, TRANSITION_TIME, {top: "-100%"});

		$container.data("project", $container.data("project") + 1);
		if ($container.data("project") >= $projects.length) {
			$container.data("project", 0);
		}

		var $newProject = $projects.eq( $container.data("project") );
		$newProject.data("group", 0);
		var $firstGroup = $newProject.find(".carousel .group").eq(0);
		TweenMax.to($firstGroup, 0, {left: "0%"});
		TweenMax.fromTo($newProject, TRANSITION_TIME, {top: "100%"}, {delay: 0.1, top: "0%"});

		console.log("change project to ", $container.data("project"));
		updateProjectNav();
	}


	var jumpProject = function(num) {
		console.log("jumpProject", num);

		var $oldProject = $projects.eq( $container.data("project") );
		TweenMax.to($oldProject, TRANSITION_TIME, {top: "-100%"});


		$container.data("project", parseInt(num) - 1);
		
		var $newProject = $projects.eq( $container.data("project") );
		$newProject.data("group", 0);
		var $firstGroup = $newProject.find(".carousel .group").eq(0);
		TweenMax.to($firstGroup, 0, {left: "0%"});
		TweenMax.fromTo($newProject, TRANSITION_TIME, {top: "100%"}, {delay: 0.3, top: "0%"});

		console.log("change project to ", $container.data("project"));
		updateProjectNav();
		
	}




	var prevGroup = function() {
		var $project = $projects.eq( $container.data("project") );
		var $oldGroup = $project.find(".carousel .group").eq( $project.data("group") );

		TweenMax.to($oldGroup, TRANSITION_TIME, {left: "100%"});

		$project.data("group", $project.data("group") - 1);
		if ($project.data("group") == -1) {
			$project.data("group", $project.find(".carousel .group").length - 1);
		}

		var $newGroup = $project.find(".carousel .group").eq( $project.data("group") );
		TweenMax.fromTo($newGroup, TRANSITION_TIME, {left: "-100%"}, {left: "0%"});

		console.log("change group to ", $project.data("group"));
	}

	var nextGroup = function() {
		var $project = $projects.eq( $container.data("project") );
		var $oldGroup = $project.find(".carousel .group").eq( $project.data("group") );

		TweenMax.to($oldGroup, TRANSITION_TIME, {left: "-100%"});

		$project.data("group", $project.data("group") + 1);
		if ($project.data("group") >= $project.find(".carousel .group").length) {
			$project.data("group", 0);
		}

		var $newGroup = $project.find(".carousel .group").eq( $project.data("group") );
		TweenMax.fromTo($newGroup, TRANSITION_TIME, {left: "100%"}, {left: "0%"});

		console.log("change group to ", $project.data("group"));
	}

	var updateProjectNav = function() {
		$(".page-two .header li").removeClass("active").eq( $container.data("project") + 1 ).addClass("active");
	}

	window.prevGroup = prevGroup;
	window.nextGroup = nextGroup;

	window.prevProject = prevProject;
	window.nextProject = nextProject;
	window.jumpProject = jumpProject;

	$(window).on("keyup", function(e) {
		console.log(e.keyCode);
		
		// 38 up
		// 40 down
		// 37 left
		// 39 right
		
		e.preventDefault();

		if (e.keyCode == 38) {
			prevProject();
		} else if (e.keyCode == 40) {
			nextProject();
		} else if (e.keyCode == 37) {
			prevGroup();
		} else if (e.keyCode == 39) {
			nextGroup();
		}
	})


});

