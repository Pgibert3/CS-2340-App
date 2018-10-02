using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Toast.Lib.RNToastLib
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNToastLibModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNToastLibModule"/>.
        /// </summary>
        internal RNToastLibModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNToastLib";
            }
        }
    }
}
