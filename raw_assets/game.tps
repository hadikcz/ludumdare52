<?xml version="1.0" encoding="UTF-8"?>
<data version="1.0">
    <struct type="Settings">
        <key>fileFormatVersion</key>
        <int>4</int>
        <key>texturePackerVersion</key>
        <string>5.0.0</string>
        <key>autoSDSettings</key>
        <array>
            <struct type="AutoSDSettings">
                <key>scale</key>
                <double>1</double>
                <key>extension</key>
                <string></string>
                <key>spriteFilter</key>
                <string></string>
                <key>acceptFractionalValues</key>
                <false/>
                <key>maxTextureSize</key>
                <QSize>
                    <key>width</key>
                    <int>-1</int>
                    <key>height</key>
                    <int>-1</int>
                </QSize>
            </struct>
        </array>
        <key>allowRotation</key>
        <false/>
        <key>shapeDebug</key>
        <false/>
        <key>dpi</key>
        <uint>72</uint>
        <key>dataFormat</key>
        <string>phaser</string>
        <key>textureFileName</key>
        <filename></filename>
        <key>flipPVR</key>
        <false/>
        <key>pvrCompressionQuality</key>
        <enum type="SettingsBase::PvrCompressionQuality">PVR_QUALITY_NORMAL</enum>
        <key>atfCompressData</key>
        <false/>
        <key>mipMapMinSize</key>
        <uint>32768</uint>
        <key>etc1CompressionQuality</key>
        <enum type="SettingsBase::Etc1CompressionQuality">ETC1_QUALITY_LOW_PERCEPTUAL</enum>
        <key>etc2CompressionQuality</key>
        <enum type="SettingsBase::Etc2CompressionQuality">ETC2_QUALITY_LOW_PERCEPTUAL</enum>
        <key>dxtCompressionMode</key>
        <enum type="SettingsBase::DxtCompressionMode">DXT_PERCEPTUAL</enum>
        <key>jxrColorFormat</key>
        <enum type="SettingsBase::JpegXrColorMode">JXR_YUV444</enum>
        <key>jxrTrimFlexBits</key>
        <uint>0</uint>
        <key>jxrCompressionLevel</key>
        <uint>0</uint>
        <key>ditherType</key>
        <enum type="SettingsBase::DitherType">NearestNeighbour</enum>
        <key>backgroundColor</key>
        <uint>0</uint>
        <key>libGdx</key>
        <struct type="LibGDX">
            <key>filtering</key>
            <struct type="LibGDXFiltering">
                <key>x</key>
                <enum type="LibGDXFiltering::Filtering">Linear</enum>
                <key>y</key>
                <enum type="LibGDXFiltering::Filtering">Linear</enum>
            </struct>
        </struct>
        <key>shapePadding</key>
        <uint>0</uint>
        <key>jpgQuality</key>
        <uint>80</uint>
        <key>pngOptimizationLevel</key>
        <uint>1</uint>
        <key>webpQualityLevel</key>
        <uint>101</uint>
        <key>textureSubPath</key>
        <string></string>
        <key>atfFormats</key>
        <string></string>
        <key>textureFormat</key>
        <enum type="SettingsBase::TextureFormat">png</enum>
        <key>borderPadding</key>
        <uint>0</uint>
        <key>maxTextureSize</key>
        <QSize>
            <key>width</key>
            <int>2048</int>
            <key>height</key>
            <int>2048</int>
        </QSize>
        <key>fixedTextureSize</key>
        <QSize>
            <key>width</key>
            <int>-1</int>
            <key>height</key>
            <int>-1</int>
        </QSize>
        <key>algorithmSettings</key>
        <struct type="AlgorithmSettings">
            <key>algorithm</key>
            <enum type="AlgorithmSettings::AlgorithmId">MaxRects</enum>
            <key>freeSizeMode</key>
            <enum type="AlgorithmSettings::AlgorithmFreeSizeMode">Best</enum>
            <key>sizeConstraints</key>
            <enum type="AlgorithmSettings::SizeConstraints">AnySize</enum>
            <key>forceSquared</key>
            <false/>
            <key>maxRects</key>
            <struct type="AlgorithmMaxRectsSettings">
                <key>heuristic</key>
                <enum type="AlgorithmMaxRectsSettings::Heuristic">Best</enum>
            </struct>
            <key>basic</key>
            <struct type="AlgorithmBasicSettings">
                <key>sortBy</key>
                <enum type="AlgorithmBasicSettings::SortBy">Best</enum>
                <key>order</key>
                <enum type="AlgorithmBasicSettings::Order">Ascending</enum>
            </struct>
            <key>polygon</key>
            <struct type="AlgorithmPolygonSettings">
                <key>alignToGrid</key>
                <uint>1</uint>
            </struct>
        </struct>
        <key>dataFileNames</key>
        <map type="GFileNameMap">
            <key>json</key>
            <struct type="DataFile">
                <key>name</key>
                <filename>../assets/images/game_atlas.json</filename>
            </struct>
        </map>
        <key>multiPack</key>
        <false/>
        <key>forceIdenticalLayout</key>
        <false/>
        <key>outputFormat</key>
        <enum type="SettingsBase::OutputFormat">RGBA8888</enum>
        <key>alphaHandling</key>
        <enum type="SettingsBase::AlphaHandling">ClearTransparentPixels</enum>
        <key>contentProtection</key>
        <struct type="ContentProtection">
            <key>key</key>
            <string></string>
        </struct>
        <key>autoAliasEnabled</key>
        <true/>
        <key>trimSpriteNames</key>
        <true/>
        <key>prependSmartFolderName</key>
        <false/>
        <key>autodetectAnimations</key>
        <true/>
        <key>globalSpriteSettings</key>
        <struct type="SpriteSettings">
            <key>scale</key>
            <double>2</double>
            <key>scaleMode</key>
            <enum type="ScaleMode">Fast</enum>
            <key>extrude</key>
            <uint>1</uint>
            <key>trimThreshold</key>
            <uint>1</uint>
            <key>trimMargin</key>
            <uint>1</uint>
            <key>trimMode</key>
            <enum type="SpriteSettings::TrimMode">Trim</enum>
            <key>tracerTolerance</key>
            <int>200</int>
            <key>heuristicMask</key>
            <false/>
            <key>defaultPivotPoint</key>
            <point_f>0.5,0.5</point_f>
            <key>writePivotPoints</key>
            <false/>
        </struct>
        <key>individualSpriteSettings</key>
        <map type="IndividualSpriteSettingsMap">
            <key type="filename">game/buildings/bakery.png</key>
            <key type="filename">game/buildings/bakery_flame.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>19,27,39,55</rect>
                <key>scale9Paddings</key>
                <rect>19,27,39,55</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/bakery_bread.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>6,4,12,8</rect>
                <key>scale9Paddings</key>
                <rect>6,4,12,8</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/bakery_flour.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>7,6,15,12</rect>
                <key>scale9Paddings</key>
                <rect>7,6,15,12</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/farm.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>21,14,41,29</rect>
                <key>scale9Paddings</key>
                <rect>21,14,41,29</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/farm_wheat.png</key>
            <key type="filename">game/buildings/mill_wheat.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,5,6,9</rect>
                <key>scale9Paddings</key>
                <rect>3,5,6,9</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/inn.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>25,21,50,41</rect>
                <key>scale9Paddings</key>
                <rect>25,21,50,41</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/inn_bread.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>10,4,21,7</rect>
                <key>scale9Paddings</key>
                <rect>10,4,21,7</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/mill_all.png</key>
            <key type="filename">game/buildings/mill_base.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>16,17,31,33</rect>
                <key>scale9Paddings</key>
                <rect>16,17,31,33</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/mill_flour.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>8,6,15,13</rect>
                <key>scale9Paddings</key>
                <rect>8,6,15,13</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/mill_wheel.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>15,14,29,27</rect>
                <key>scale9Paddings</key>
                <rect>15,14,29,27</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/buildings/warehouse.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>25,21,49,42</rect>
                <key>scale9Paddings</key>
                <rect>25,21,49,42</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/bush1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,4,5,7</rect>
                <key>scale9Paddings</key>
                <rect>3,4,5,7</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/bush2.png</key>
            <key type="filename">game/env/bush3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>5,5,9,9</rect>
                <key>scale9Paddings</key>
                <rect>5,5,9,9</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/bush4.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>6,6,11,11</rect>
                <key>scale9Paddings</key>
                <rect>6,6,11,11</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/grass1.png</key>
            <key type="filename">game/env/grass2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>2,1,3,2</rect>
                <key>scale9Paddings</key>
                <rect>2,1,3,2</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/grassDot1.png</key>
            <key type="filename">game/env/grassDot5.png</key>
            <key type="filename">game/env/rock2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,2,6,5</rect>
                <key>scale9Paddings</key>
                <rect>3,2,6,5</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/grassDot2.png</key>
            <key type="filename">game/ingame_ui/icon_bread.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,2,7,3</rect>
                <key>scale9Paddings</key>
                <rect>4,2,7,3</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/grassDot3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,3,7,6</rect>
                <key>scale9Paddings</key>
                <rect>3,3,7,6</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/grassDot4.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,2,7,4</rect>
                <key>scale9Paddings</key>
                <rect>4,2,7,4</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/grassDot6.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,3,7,5</rect>
                <key>scale9Paddings</key>
                <rect>4,3,7,5</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/grassDot7.png</key>
            <key type="filename">game/env/rock1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,2,5,4</rect>
                <key>scale9Paddings</key>
                <rect>3,2,5,4</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/grassDot8.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,3,5,5</rect>
                <key>scale9Paddings</key>
                <rect>3,3,5,5</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/pond1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>14,9,27,17</rect>
                <key>scale9Paddings</key>
                <rect>14,9,27,17</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/pond2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>11,8,21,15</rect>
                <key>scale9Paddings</key>
                <rect>11,8,21,15</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/rock3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>6,4,11,9</rect>
                <key>scale9Paddings</key>
                <rect>6,4,11,9</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/rock4.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,3,8,6</rect>
                <key>scale9Paddings</key>
                <rect>4,3,8,6</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/smallbush1.png</key>
            <key type="filename">game/env/smallbush2.png</key>
            <key type="filename">game/env/smallbush3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>2,2,4,5</rect>
                <key>scale9Paddings</key>
                <rect>2,2,4,5</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/stonky1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,3,7,7</rect>
                <key>scale9Paddings</key>
                <rect>3,3,7,7</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/env/stonky2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,3,6,5</rect>
                <key>scale9Paddings</key>
                <rect>3,3,6,5</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/ingame_ui/bubble_hunger.png</key>
            <key type="filename">game/ingame_ui/bubble_paused.png</key>
            <key type="filename">game/ingame_ui/bubble_waiting.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,7,8,14</rect>
                <key>scale9Paddings</key>
                <rect>4,7,8,14</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/ingame_ui/death.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>5,6,10,12</rect>
                <key>scale9Paddings</key>
                <rect>5,6,10,12</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/ingame_ui/icon_coin.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>2,2,3,5</rect>
                <key>scale9Paddings</key>
                <rect>2,2,3,5</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/ingame_ui/icon_flour.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,3,5,7</rect>
                <key>scale9Paddings</key>
                <rect>3,3,5,7</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/ingame_ui/icon_wheat.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>2,2,4,4</rect>
                <key>scale9Paddings</key>
                <rect>2,2,4,4</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
        </map>
        <key>fileList</key>
        <array>
            <filename>game</filename>
        </array>
        <key>ignoreFileList</key>
        <array/>
        <key>replaceList</key>
        <array/>
        <key>ignoredWarnings</key>
        <array/>
        <key>commonDivisorX</key>
        <uint>1</uint>
        <key>commonDivisorY</key>
        <uint>1</uint>
        <key>packNormalMaps</key>
        <false/>
        <key>autodetectNormalMaps</key>
        <true/>
        <key>normalMapFilter</key>
        <string></string>
        <key>normalMapSuffix</key>
        <string></string>
        <key>normalMapSheetFileName</key>
        <filename></filename>
        <key>exporterProperties</key>
        <map type="ExporterProperties"/>
    </struct>
</data>
