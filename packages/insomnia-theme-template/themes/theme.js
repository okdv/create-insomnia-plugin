module.exports.themes = [{
    name: 'theme-name', // theme name in kebab-case
    displayName: 'Theme Name', // formatted theme name
    theme: {
        // Background, foreground, and highlight values nested directly in the theme 
        // object will serve as the default overwrites for all properties you add.
        background: {
            default: '#21262D',  // primary background color
            success: '#1F6FEB',  // POST request, 200 OK, parameter names
            notice: '#E8F086',  // PATCH request
            warning: '#A691AE',  // PUT request
            danger: '#FF4242',  // DELETE request
            surprise: '#FFC20A',  // accent (Dashboard link, GET request, 
            info: '#58A6FF'   // OPTIONS AND HEAD request
        },
        foreground: {
            default: '#fff',    // primary font color
            success: '#fff',    // secondary font color for success background
            notice: '#000',    // secondary font color for notice background
            warning: '#fff',    // secondary font color for warning background
            danger: '#fff',    // secondary font color for danger background
            surprise: '#000',    // secondary font color for surprise background
            info: '#000'     // secondary font color for info background
        },
        highlight: {
            default: '#D3D3D3',     // sidebar highlight color.
            xxs: '#000',
            xs: '#000',
            sm: '#000',
            md: '#000',
            lg: '#000',
            xl: '#000'
        },
        rawCss: `
            .tooltip, .dropdown__menu {
                opacity: 0.95;
            }
        `,
        // The styles object targets sub-components of the Insomnia application.
        styles: {
            appHeader: {
                // Each component can contain a theme block (background, foreground, highlight)
                background: {
                    default: '#000',
                    success: '#000',
                    notice: '#000',
                    warning: '#000',
                    danger: '#000',
                    surprise: '#000',
                    info: '#000'
                },
                foreground: {
                    default: '#000',
                    success: '#000',
                    notice: '#000',
                    warning: '#000',
                    danger: '#000',
                    surprise: '#000',
                    info: '#000'
                },
                highlight: {
                    default: '#D3D3D3',
                    xxs: '#000',
                    xs: '#000',
                    sm: '#000',
                    md: '#000',
                    lg: '#000',
                    xl: '#000'
                }
            },
            dialog: {
                background: {
                    default: '#2E4052'
                }
            },
            dialogFooter: {
                foreground: {
                    success: '#000'
                }
            },
            dialogHeader: {
                highlight: {
                    default: '#000'
                }
            },
            dropdown: {
                background: {
                    warning: '#000'
                }
            },
            editor: {
                foreground: {
                    danger: '#000'
                }
            },
            link: {
                highlight: {
                    default: '#000'
                }
            },
            overlay: {
                background: {
                    info: '#000'
                }
            },
            pane: {
                foreground: {
                    default: '#000'
                }
            },
            paneHeader: {
                highlight: {
                    default: '#000'
                }
            },
            sidebar: {
                background: {
                    notice: '#000'
                }
            },
            sidebarHeader: {
                foreground: {
                    warning: '#000'
                }
            },
            sidebarList: {
                highlight: {
                    default: '#000'
                }
            },
            tooltip: {
                background: {
                    surprise: '#000'
                }
            },
            transparentOVerlay: {
                foreground: {
                    info: '#000'
                }
            }
        }
    }
}]
