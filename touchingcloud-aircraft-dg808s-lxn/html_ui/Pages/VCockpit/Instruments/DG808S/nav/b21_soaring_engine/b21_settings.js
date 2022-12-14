// *****************************************************************************
// ************    B21_SETTINGS.js          ************************************
//
// This file contains customization information for the B21 soaring instruments
// *****************************************************************************

var B21_POLAR_WEIGHT_KG = 421; // weight (Kg) the curves are directly valid for

//   speed/sink [kph, m/s] (sink NEGATIVE)
var B21_POLAR_CURVE = [
                        [ -10, -10],
                        [ 60, -3],
                        [ 70, -0.6],
                        [ 72, -0.5],
                        [ 80, -0.48],
                        [ 90, -0.5],
                        [100, -0.57],
                        [110, -0.61],
                        [120, -0.67],
                        [130, -0.75],
                        [150, -0.98],
                        [170, -1.29],
                        [200, -1.9],
                        [210, -2.3],
                        [220, -2.9],
                        [230, -3.6],
                        [300, -8.5]
                    ];  // 15.2

// Speed to fly [sink m/s (negative), speed kph]
var B21_STF_CURVE = [
                    [-9, 208],
                    [-4, 208],
                    [-3, 204],
                    [-2, 180],
                    [-1, 147],
                    [ 0, 112],
                    [ 1, 90 ],
                    [ 10, 90]
        ];