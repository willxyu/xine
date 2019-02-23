var create_default_reflex_packages = function() {
    if (!client.package_exists('numpad movement')) {
        client.package_create('numpad movement', "Move around the world with your keyboard's number pad. 8=north, 9=northeast, etc. Use '/' for in, '*' for out, '-' for up and '+' for down. The 5 key will look at the room you're in.");
        var pkg = client.get_package('numpad movement');
        var dirs = { 103: 'nw', 104: 'n', 105: 'ne', 100: 'w', 101: 'look', 102: 'e', 97: 'sw', 98: 's', 99: 'se', 111: 'in', 106: 'out', 109: 'up', 107: 'down'};
        for (var v in dirs) {
            var key = client.reflex_create(pkg, dirs[v], 'keybind', 'numpad movement');
            key.key = v;
            key.key_alt = false; key.key_ctrl = false; key.key_shift = false;
            key.actions = [];
            key.actions.push({command: dirs[v]});
        }
    }
// Javascript code defining xine.nxs
//   We follow a common structure, that is: 
//    a single alias collates all Initiation Functions
//    onLoad calls this alias

// Utilities    : display(), trigger alias, `js
// Error Logging: 
// UI Functions : shtml
// UI Templates :
// GMCP eventing:
