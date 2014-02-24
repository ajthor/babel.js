describe("ann", function() {

	var ann;
	var lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique condimentum lorem eget feugiat. Donec erat leo, semper vel sem vitae, consectetur auctor tellus. Curabitur vel tincidunt libero. Vestibulum iaculis lobortis mi sit amet molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum elit mauris, vitae dapibus libero laoreet ut. Morbi posuere rutrum tortor id vehicula. In porta blandit libero, semper dignissim justo tristique id. Sed tristique ipsum sed tortor consequat lacinia. In id ligula ut justo porta cursus. Cras sit amet enim ut ante consectetur condimentum a venenatis diam. Integer sit amet mauris interdum, sodales turpis at, sagittis erat. Aenean sollicitudin dolor ut egestas molestie. Nulla nec orci eu diam auctor gravida. Donec elementum metus sagittis ante vehicula posuere. Suspendisse id commodo libero, non commodo tortor. Suspendisse sit amet ultrices urna. Donec urna enim, ornare non iaculis eget, commodo ut est. Vivamus quis molestie mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam congue nibh enim, et condimentum leo euismod a. Sed sollicitudin vitae magna pretium aliquet. Sed molestie semper dui vestibulum porta. In sit amet nibh quam. Quisque ac lacus quis odio luctus mollis. Aliquam commodo pellentesque sapien, et varius sem dictum imperdiet. Donec ut iaculis nunc. Mauris vitae pharetra tellus, id vulputate ipsum. Curabitur imperdiet purus nec porttitor blandit. Nullam pharetra, lectus a varius pulvinar, lacus dui fermentum leo, vel sodales ligula leo vitae quam. Cras ultricies lobortis lacus, a aliquam lacus consequat id. Pellentesque in mattis lacus, id tincidunt nibh. Etiam arcu tortor, vulputate a congue id, blandit at dui. Nulla sit amet urna arcu. Quisque volutpat lacinia mattis. Nulla erat lorem, ullamcorper ut porttitor sed, ultricies ut risus. Curabitur ut rhoncus dolor. Praesent eleifend fermentum orci, at congue velit luctus at. Donec sodales, urna et mattis egestas, tortor nibh laoreet nisl, et sollicitudin orci nulla sit amet magna. Praesent massa felis, rutrum volutpat odio et, eleifend rhoncus metus. Donec interdum sapien risus, congue venenatis dolor porta venenatis. Donec a ligula fringilla, ullamcorper mauris volutpat, ornare lectus. Etiam urna nunc, iaculis in congue fermentum, porta id erat. Integer consectetur massa eu tortor accumsan, nec pulvinar urna fermentum. In ut ipsum vel enim placerat vulputate sit amet ac leo. In vestibulum nisl a porttitor elementum. Praesent feugiat arcu libero, vitae varius metus dictum ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id libero egestas, blandit tellus quis, lacinia nunc. Suspendisse eget pretium justo. Quisque sit amet dolor aliquam, interdum diam nec, iaculis lacus. Etiam justo justo, ultrices non pretium eu, hendrerit in nunc. Integer volutpat justo et elit ultricies aliquet. Nunc mauris massa, mollis vitae sapien at, sagittis pellentesque metus. Nulla molestie luctus luctus. Morbi ut fermentum ante. Morbi hendrerit id augue eu pharetra. Morbi porta fringilla mi, quis tempus tortor posuere at. Donec faucibus mattis felis sed aliquam. Vestibulum ut justo sagittis, lobortis augue at, egestas nunc. Sed sit amet nisl facilisis, aliquam felis condimentum, tempor ante. Etiam nibh odio, dignissim non ultrices nec, ullamcorper mollis nunc. Nunc tristique tincidunt porttitor. Maecenas pharetra mattis arcu sit amet imperdiet. Phasellus non ante dignissim, porta lectus nec, consectetur lacus. Aliquam erat volutpat. Mauris convallis erat eget justo vehicula vestibulum. Maecenas ac felis at tellus iaculis pulvinar vel sit amet felis. Sed gravida purus consequat est tincidunt, a posuere libero iaculis. In quis risus at enim tempus ullamcorper et nec felis. Fusce auctor venenatis risus, id hendrerit tellus interdum eget. Nulla euismod ligula eget porta mattis. Quisque ut pharetra erat. Curabitur condimentum suscipit laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec ultricies tortor, in mollis lorem. Maecenas elementum augue sapien, ut lacinia lectus varius non. Suspendisse potenti. Proin at ipsum vitae velit varius gravida. Maecenas id pharetra lorem, in hendrerit libero. Donec ut leo vestibulum ipsum faucibus suscipit consequat in nibh. Quisque egestas justo eu mollis sodales. Quisque volutpat consectetur libero, eget bibendum lacus interdum eu. Vivamus eget euismod quam. Suspendisse viverra urna dolor, eget auctor mi bibendum sit amet. Cras tristique tortor neque, vel suscipit diam consequat non. Quisque lobortis varius libero, quis porta augue volutpat vel. Nam non laoreet metus. Donec sit amet orci vitae libero pulvinar egestas. Pellentesque sed turpis et odio ultricies tempus. Maecenas sit amet iaculis quam, quis iaculis nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla sollicitudin sed diam eu facilisis. Morbi lobortis consequat lacus at cursus. In augue sapien, tempus ac augue vel, placerat scelerisque lacus. Duis accumsan est dictum, convallis sapien eu, fermentum nisl. Praesent pellentesque blandit massa, aliquam dignissim tortor pretium et. Vestibulum at urna eu nulla placerat sollicitudin non quis metus. Aliquam convallis massa velit, id volutpat nibh sagittis fermentum. Phasellus gravida, tellus nec laoreet ultrices, ipsum erat aliquet metus, a aliquam nunc urna in quam. Sed nisl neque, vestibulum congue libero ut, euismod aliquam nibh. Vivamus adipiscing diam et posuere tincidunt. Aliquam tristique adipiscing posuere. Sed semper sed risus eu lobortis. Praesent tincidunt eleifend dapibus. Suspendisse eget neque nec risus varius sollicitudin vitae eu dolor.";

	it("should load without throwing", function() {
		expect(function() {
			ann = require("../ann.js");
		}).not.toThrow();
	});

	it("instantiation should work", function() {

		var a = new ann([3,2,1]);
		var output;

		// a.parse(["lorem", "ipsum", "dolor", "sit", "amet", "Lorem"]);
		// a.parse("test");
		// a.parse("tester");
		// a.parse("testing");

		// a.input([0,0,0,0]);
		// a.input([1,1,1,1,0,0]);
		// a.input([1,1,1,1,0,0,0]);

		output = a.input([0,0]);
		a.train(output, [0,0]);

		a.input([0,1]);
		a.input([1,0]);
		a.input([1,1]);

	});

});