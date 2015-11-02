
$(document).ready(function(){

	var TRANSITION_TIME = 0.6;

	
	var $container = $(".page-two .main");
	$container.data("project", 0);

	var $projects = $container.find(".main__project");

	$projects.each(function() {
		$(this).data("group", 0);
	})

	$("nav .project-nav").each(function() {
		var projectSelector = $(this).find("a").attr("href");
		var groupCount = $(projectSelector).find(".group").length;
		$(this).append("<div class='dots'></div>");
		for (var i = 0; i < groupCount; i++) {
			$(this).find(".dots").append("<a><span></span></a>");
		};
		$(this).find(".dots a").each(function(i,e) {
			$(this).on("click", function() {
				jumpGroup(i + 1);
			});
		})
	})

	// console.log($projects.first().find(".carousel .group").first());

	TweenMax.to($projects.first().find(".carousel .group").first(), TRANSITION_TIME, {left: "0%"});	


	var prevProject = function() {
		var $oldProject = $projects.eq( $container.data("project") );
		TweenMax.to($oldProject, TRANSITION_TIME, {top: "100%", zIndex: 5});

		$container.data("project", $container.data("project") - 1);
		if ($container.data("project") == -1) {
			$container.data("project", $projects.length - 1);
		}

		var $newProject = $projects.eq( $container.data("project") );
		var $firstGroup = $newProject.find(".carousel .group").eq(0);
		TweenMax.to($firstGroup, 0, {left: "0%"});
		TweenMax.fromTo($newProject, TRANSITION_TIME, {top: "-100%"}, {delay: 0.1, top: "0%", zIndex: 8});

		console.log("change project to ", $container.data("project"));
		jumpGroup(1, true);
		updateProjectNav();
	}

	var nextProject = function() {
		var $oldProject = $projects.eq( $container.data("project") );
		TweenMax.to($oldProject, TRANSITION_TIME, {top: "-100%", zIndex: 5});

		$container.data("project", $container.data("project") + 1);
		if ($container.data("project") >= $projects.length) {
			$container.data("project", 0);
		}

		var $newProject = $projects.eq( $container.data("project") );
		var $firstGroup = $newProject.find(".carousel .group").eq(0);
		TweenMax.to($firstGroup, 0, {left: "0%"});
		TweenMax.fromTo($newProject, TRANSITION_TIME, {top: "100%"}, {delay: 0.1, top: "0%", zIndex: 8});

		console.log("change project to ", $container.data("project"));
		jumpGroup(1, true);
		updateProjectNav();
	}


	var jumpProject = function(num) {
		console.log("jumpProject", num);

		var $oldProject = $projects.eq( $container.data("project") );

		if (parseInt($container.data("project")) == parseInt(num) - 1) {
			console.log("jump to same project!");
			TweenMax.to($oldProject, 0.1, {top: "-3%"});
			TweenMax.to($oldProject, 0.15, {delay: 0.1, top: "3%"});
			TweenMax.to($oldProject, 0.1, {delay: 0.25, top: "0%"});
			return;
		}

		TweenMax.to($oldProject, TRANSITION_TIME, {top: "-100%", zIndex: 5});


		$container.data("project", parseInt(num) - 1);
		
		var $newProject = $projects.eq( $container.data("project") );
		var $firstGroup = $newProject.find(".carousel .group").eq(0);
		TweenMax.to($firstGroup, 0, {left: "0%"});
		TweenMax.fromTo($newProject, TRANSITION_TIME, {top: "100%"}, {delay: 0.3, top: "0%", zIndex: 8});

		jumpGroup(1, true);
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
		updateProjectNav();
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
		updateProjectNav();
	}


	var jumpGroup = function(num, instant) {
		var time = TRANSITION_TIME;
		if (instant) time = 0;

		var $project = $projects.eq( $container.data("project") );
		var $oldGroup = $project.find(".carousel .group").eq( $project.data("group") );

		TweenMax.to($oldGroup, time, {left: "-100%"});

		$project.data("group", parseInt(num) - 1);

		var $newGroup = $project.find(".carousel .group").eq( $project.data("group") );
		TweenMax.fromTo($newGroup, time, {left: "100%"}, {left: "0%"});

		console.log("change group to ", $project.data("group"));
		updateProjectNav();
	}




	var updateProjectNav = function() {
		$(".page-two .header li").removeClass("active").eq( $container.data("project") + 1 ).addClass("active");
		
		var $project = $projects.eq( $container.data("project") );

		$("nav li.active .dots a").css("opacity", 0.2).eq( $project.data("group") ).css("opacity", 1);
	}


	window.prevGroup = prevGroup;
	window.nextGroup = nextGroup;
	window.jumpGroup = jumpGroup;

	window.prevProject = prevProject;
	window.nextProject = nextProject;
	window.jumpProject = jumpProject;

	$(window).on("keydown", function(e) {
		console.log(e.keyCode);
		
		// 38 up
		// 40 down
		// 37 left
		// 39 right
		
		e.preventDefault();

		if (e.keyCode == 38) {
			prevProject();
			return false;
		} else if (e.keyCode == 40) {
			nextProject();
			return false;
		} else if (e.keyCode == 37) {
			prevGroup();
			return false;
		} else if (e.keyCode == 39) {
			nextGroup();
			return false;
		}
	})

	$(".edge-top").on("click", prevProject);
	$(".edge-bottom").on("click", nextProject);
	$(".edge-right").on("click", nextGroup);
	$(".edge-left").on("click", prevGroup);


	updateProjectNav();

});

