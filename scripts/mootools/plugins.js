//Content Editable Class

var Editable = new Class({
	
	Implements: [Events, Options],
	
	options: {/*
		onEdit: $empty,
		onBlur: $empty,*/
		blockTab: false,
		enter: false,
		wrapper: false,
		className: 'editing',
		activation: 'dblclick'
	},
	
	initialize: function(element, options){
		this.setOptions(options);

		this.element = $(element);
		
		if (this.options.blockTab) this.element.addEvent('keydown', this.blockTab);
		
		this.wrapper = this.options.wrapper || this.element;
		this.element.addEvent(this.options.activation, this.edit.bind(this));
		this.element.addEvent('blur', this.blur.bind(this));
		if (!this.options.enter) this.element.addEvent('keydown', function(event){
			if (event.key == 'enter') this.blur();
		});
		this.element.store('editable', this);
	},
	
	blockTab: function(event){
		if (event.key == 'tab') event.preventDefault();
	},
	
	edit: function(){
		this.element.contentEditable = true;
		this.wrapper.addClass(this.options.className).focus();
		this.fireEvent('onEdit', this.element);
	},
	
	blur: function(){
		this.element.contentEditable = false;
		this.wrapper.removeClass(this.options.className);
		this.fireEvent('onBlur', this.element);
	}
	
});

//String extensions

String.implement({
	
	escape: function(){
		return escape(this);
	},
	
	unescape: function(){
		return unescape(this);
	}
	
});