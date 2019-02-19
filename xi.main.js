// pseudo code
//   if xine exists, delete it
//   download xine & all dependencies
//   run xine
//   if xine-custom exists, run xine-custom

// player alterations to xine should be saved in xine-custom

client.package_exists(name)
client.package_remove(name)
client.package_create(name, desc)
client.package_enable(name, enable)
